"use client";

import React, { useState, useEffect } from "react";
import { Drawer, Slider, Switch } from "antd";
import { IoAccessibility } from "react-icons/io5";
// @ts-ignore
import { useSpeechSynthesis, Voice } from "react-speech-kit";

const AccessibilityDrawer: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isAssistantOn, setIsAssistantOn] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const [volume, setVolume] = useState<number>(1);
  const [rate, setRate] = useState<number>(1);
  const { speak, cancel, voices } = useSpeechSynthesis();
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [language, setLanguage] = useState<string>("en");

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voice = voices.find((v: any) => v.name === e.target.value);
    setSelectedVoice(voice ?? null);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const filteredVoices = voices.filter((voice: any) =>
    voice.lang.startsWith(language),
  );

  const handleTextToSpeech = (text: string) => {
    if (!isAssistantOn) return;
    speak({
      text,
      voice: selectedVoice ?? undefined,
      rate,
      volume,
    });
  };

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      if (isAssistantOn) {
        const text = (event.target as HTMLElement)?.innerText?.trim();
        if (text) {
          console.log("Reading:", text);
          handleTextToSpeech(text);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [isAssistantOn, selectedVoice, rate, volume]);

  // Block page scroll when the drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
  }, [drawerOpen]);

  return (
    <div>
      {/* Accessibility Icon */}
      <div
        onClick={() => setDrawerOpen(true)}
        style={{
          cursor: "pointer",
          position: "fixed",
          bottom: 40,
          right: 40,
        }}
        className="bg-tertiary p-4 rounded-full z-20"
      >
        <IoAccessibility size={30} className="text-white" />
      </div>

      {/* Drawer */}
      <Drawer
        title="Accessibility Settings"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        {/* Font Size Control */}
        <div style={{ marginBottom: 20 }}>
          <p>Font Size:</p>
          <Slider
            min={12}
            max={30}
            value={fontSize}
            onChange={(value: number) => setFontSize(value)}
          />
        </div>

        {/* Language Selector */}
        <div style={{ marginBottom: 20 }}>
          <p>Select Language:</p>
          <select onChange={handleLanguageChange} style={{ width: "100%" }}>
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="uz">O'zbek</option>
          </select>
        </div>

        {/* Voice Assistant */}
        <div style={{ marginBottom: 20 }}>
          <p>Voice Assistant:</p>
          <Switch
            checked={isAssistantOn}
            onChange={(checked: boolean) => setIsAssistantOn(checked)}
          />
          <p>{isAssistantOn ? "Assistant is ON" : "Assistant is OFF"}</p>
        </div>

        {/* Voice Selection */}
        <div style={{ marginBottom: 20 }}>
          <p>Select Voice:</p>
          <select onChange={handleVoiceChange} style={{ width: "100%" }}>
            {filteredVoices.map((v: any) => (
              <option key={v.name} value={v.name}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>

        {/* Volume Control */}
        <div style={{ marginBottom: 20 }}>
          <p>Volume:</p>
          <Slider
            min={0.1}
            max={1}
            step={0.1}
            value={volume}
            onChange={(value: number) => setVolume(value)}
          />
        </div>

        {/* Rate Control */}
        <div style={{ marginBottom: 20 }}>
          <p>Reading Speed:</p>
          <Slider
            min={0.5}
            max={2}
            step={0.1}
            value={rate}
            onChange={(value: number) => setRate(value)}
          />
        </div>

        {/* Stop Speaking Button */}
        <div>
          <button onClick={cancel} style={{ marginTop: 10 }}>
            Stop Speaking
          </button>
        </div>
      </Drawer>

      {/* Dynamic Styles */}
      <style>
        {`
          body {
            font-size: ${fontSize}px;
          }
        `}
      </style>
    </div>
  );
};

export default AccessibilityDrawer;
