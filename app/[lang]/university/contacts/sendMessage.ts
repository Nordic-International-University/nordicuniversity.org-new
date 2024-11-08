import { ContactMessage } from "@/types/api/apiTypes";

const sendMessageEmail = async (data: ContactMessage) => {
  const response = fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/core/feedback`,
    {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    },
  );

  return response;
};

export { sendMessageEmail };
