import React, { useState, useRef, useEffect } from "react";
import { Button, message, Progress, Typography } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "@/lib/query/register.query";
import { IoReload } from "react-icons/io5";

interface OTPInputProps {
  id: string;
  formData: any;
  path: string;
}

const { Text } = Typography;

const CustomOTPInput: React.FC<{
  length: number;
  onChange: (value: string) => void;
}> = ({ length, onChange }) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const key = e.key;

    if (key === "Backspace") {
      e.preventDefault();
      const newValues = [...values];
      if (values[index]) {
        newValues[index] = "";
        setValues(newValues);
        onChange(newValues.join(""));
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        newValues[index - 1] = "";
        setValues(newValues);
        onChange(newValues.join(""));
      }
      return;
    }

    if (key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
      return;
    }

    if (key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
      return;
    }

    if (!/^\d$/.test(key)) {
      e.preventDefault();
      if (key.length === 1) {
        message.error("Faqat raqam kiritish mumkin");
      }
      return;
    }

    e.preventDefault();
    const newValues = [...values];
    newValues[index] = key;
    setValues(newValues);
    onChange(newValues.join(""));

    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <div
      className="w-full justify-center"
      style={{ display: "flex", gap: "8px" }}
    >
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el: any) => (inputsRef.current[index] = el)}
          type="text"
          value={value}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          style={{
            width: "100%",
            height: "auto",
            textAlign: "center",
            fontSize: "24px",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
          }}
          inputMode="numeric"
        />
      ))}
    </div>
  );
};

const OTPInput: React.FC<OTPInputProps> = ({ id, formData, path }) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(60);
  const [verifyId, setVerifyId] = useState<string>("");
  const [canResend, setCanResend] = useState(false);
  const [registerUser] = useRegisterUserMutation();
  const router = useRouter();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  useEffect(() => {
    setVerifyId(id);
  }, []);

  useEffect(() => {
    setTimer(60);
  }, []);

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sms/check-number`,
        {
          phone_number: formData.phone_number,
        },
      );
      setVerifyId(response.data.verifyID);
      message.success("SMS kod qayta yuborildi!");
      setTimer(60);
      setCanResend(false);
    } catch (error: any) {
      if (error.status === 429) {
        message.error(error.response.data.message);
        return;
      }
      message.error("SMS kodni qayta yuborishda xatolik yuz berdi.");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 4) {
      message.warning("Iltimos, kodni kiriting");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sms/verify-number`,
        { id: verifyId, code: Number(otp) },
      );

      if (response?.data?.matched === true) {
        try {
          const registerResponse = await registerUser(formData).unwrap();
          Cookies.set("access_token", registerResponse?.data?.token);
          Cookies.set("phone", formData.phone_number);
          console.log(path);
          router.push(path);
          message.success("Muvaffaqiyatli ro'yxatdan o'tildi!");
        } catch (err: any) {
          message.error("Ro'yxatdan o'tishda xatolik yuz berdi");
        }
      } else {
        message.error("Tasdiqlash kodi noto‘g‘ri!");
      }
    } catch (error) {
      message.error("Server bilan muammo yuz berdi.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="h-40 flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <CustomOTPInput length={4} onChange={setOtp} />
      </div>

      <div>
        <div className="flex flex-col items-center">
          {timer > 0 ? (
            <div className="flex gap-2  flex-row-reverse items-center">
              <Progress
                type="circle"
                percent={(timer / 60) * 100}
                showInfo={false}
                size={20}
              />
              <Text style={{ fontSize: "14px" }}>
                {timer} soniyadan so'ng qayta yuborish mumkun
              </Text>
            </div>
          ) : (
            <Button
              onClick={handleResendOtp}
              type="default"
              icon={<IoReload />}
              disabled={!canResend}
              className="w-full"
            >
              Qayta yuborish
            </Button>
          )}
        </div>

        <Button
          onClick={handleVerifyOtp}
          type="primary"
          loading={isVerifying}
          className="mt-3 w-full"
        >
          Kodni tasdiqlash
        </Button>
      </div>
    </div>
  );
};

export default OTPInput;
