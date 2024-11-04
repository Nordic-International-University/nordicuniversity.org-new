import React, { useState, useEffect } from "react";

function ScreenReader() {
  const [isReadingMode, setIsReadingMode] = useState(false);

  const toggleReadingMode = () => {
    setIsReadingMode((prev) => !prev);
  };

  useEffect(() => {
    const handleTextClick = (event: any) => {
      if (isReadingMode && event.target.innerText) {
        const text = event.target.innerText;
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
      }
    };

    if (isReadingMode) {
      document.addEventListener("click", handleTextClick);
    } else {
      document.removeEventListener("click", handleTextClick);
      speechSynthesis.cancel();
    }

    // Cleanup
    return () => document.removeEventListener("click", handleTextClick);
  }, [isReadingMode]);

  return (
    <button onClick={toggleReadingMode}>
      {isReadingMode ? "Ekran suxandoni o‘chirish" : "Ekran suxandoni yoqish"}
    </button>
  );
}

export default ScreenReader;
