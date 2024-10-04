import React, { useState, useRef } from "react";
import { Button, message } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "@/lib/query/register.query";
import axios from "axios";

interface OTPInputProps {
  id: string;
  formData: any;
}

const CustomOTPInput: React.FC<{ length: number; onChange: (value: string) => void }> = ({ length, onChange }) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const key = e.key;

    if (key === 'Backspace') {
      e.preventDefault();
      const newValues = [...values];
      if (values[index]) {
        newValues[index] = '';
        setValues(newValues);
        onChange(newValues.join(''));
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        newValues[index - 1] = '';
        setValues(newValues);
        onChange(newValues.join(''));
      }
      return;
    }

    if (key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
      return;
    }

    if (key === 'ArrowRight' && index < length - 1) {
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
    onChange(newValues.join(''));

    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
      <div className="w-full justify-center" style={{ display: 'flex', gap: '8px' }}>
        {values.map((value, index) => (
            <input
                key={index}
                ref={(el:any) => (inputsRef.current[index] = el)}
                type="text"
                value={value}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                style={{
                  width: '100%',
                  height: 'auto',
                  textAlign: 'center',
                  fontSize: '24px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                }}
                inputMode="numeric"
            />
        ))}
      </div>
  );
};

const OTPInput: React.FC<OTPInputProps> = ({ id, formData }) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [registerUser] = useRegisterUserMutation();
  const router = useRouter();

  (otp);

  const handleVerifyOtp = async () => {
    if (otp.length !== 4) {
      message.warning("Iltimos, kodni kiriting");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/sms/verify-number`,
          { id: id, code: Number(otp) }
      );

      (response)

      if (response?.data?.matched === true) {
        try {
          const registerResponse = await registerUser(formData).unwrap();
          (registerResponse);
          Cookies.set("access_token", registerResponse?.data?.token);
          Cookies.set("phone", formData.phone_number);
          router.push("/profile");
          message.success("muvaffaqiyatli ro'yxatdan o'tildi!");
        } catch (err: any) {
          message.error("Ro'yxatdan o'tishda xatolik yuz berdi");
        }
      } else {
        message.error("Tadiqlash kodi noto‘g‘ri!");
      }
    } catch (error) {
      (error);
      message.error("Server bilan muammo yuz berdi.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
      <div className="h-20">
        <div className="mt-5 justify-center flex flex-col">
          <CustomOTPInput length={4} onChange={setOtp} />
        </div>
        <Button
            onClick={handleVerifyOtp}
            type="primary"
            loading={isVerifying}
            className="mt-3 absolute rounded-b-md rounded-t-none py-5 right-0 w-full bottom-0 flex items-center justify-center"
        >
          Kodni tasdiqlash
        </Button>
      </div>
  );
};

export default OTPInput;
