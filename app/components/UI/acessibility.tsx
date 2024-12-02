"use client";

import React, { useState, useEffect } from "react";
import { Drawer, Slider, Switch } from "antd";
import { IoAccessibility } from "react-icons/io5";
// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";

const AccessibilityDrawer: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const [lineSpacing, setLineSpacing] = useState<number>(1.5); // Qatorlar oralig'i
  const [isReadingMode, setIsReadingMode] = useState<boolean>(false); // O'qish rejimi
  const [isGrayscale, setIsGrayscale] = useState<boolean>(false);
  const [isUnderlineLinks, setIsUnderlineLinks] = useState<boolean>(false);
  const [hideImages, setHideImages] = useState<boolean>(false);

  const { speak, cancel } = useSpeechSynthesis();

  useEffect(() => {
    // Grayscale rejimini qo'llash
    document.body.style.filter = isGrayscale ? "grayscale(100%)" : "none";
  }, [isGrayscale]);

  useEffect(() => {
    // Havolalarni ostidan chiziq bilan belgilash
    const style = document.createElement("style");
    style.id = "underline-links-style";
    style.innerHTML = `
      a {
        text-decoration: ${isUnderlineLinks ? "underline" : "none"};
      }
    `;
    document.head.appendChild(style);
    return () => {
      const existingStyle = document.getElementById("underline-links-style");
      if (existingStyle) existingStyle.remove();
    };
  }, [isUnderlineLinks]);

  useEffect(() => {
    // Tasvirlarni yashirish
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      (img as HTMLElement).style.display = hideImages ? "none" : "block";
    });
  }, [hideImages]);

  useEffect(() => {
    // O'qish rejimini qo'llash
    if (isReadingMode) {
      document.body.style.backgroundColor = "#f5f5dc"; // O'qish uchun qulay rang
      document.body.style.color = "#333"; // Matn rangi
      setFontSize(18);
      setLineSpacing(2);
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    }
  }, [isReadingMode]);

  useEffect(() => {
    // Scrollni Drawer holatiga qarab boshqarish
    if (drawerOpen) {
      document.body.style.overflow = "hidden"; // Scrollni to'xtatish
    } else {
      document.body.style.overflow = ""; // Scrollni tiklash
    }
  }, [drawerOpen]);

  return (
    <div>
      {/* Accessibility Icon */}
      <div
        onClick={() => {
          setDrawerOpen(true);
        }}
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
        placement="right"
        className="top-0"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        {/* Font Size Control */}
        <div style={{ marginBottom: 20 }}>
          <p>Matn hajmini sozlash:</p>
          <Slider
            min={12}
            max={30}
            value={fontSize}
            onChange={(value: number) => setFontSize(value)}
          />
        </div>

        {/* Line Spacing Control */}
        <div style={{ marginBottom: 20 }}>
          <p>Qatorlar oralig'ini sozlash:</p>
          <Slider
            min={1}
            max={3}
            step={0.1}
            value={lineSpacing}
            onChange={(value: number) => setLineSpacing(value)}
          />
        </div>

        {/* Reading Mode */}
        <div style={{ marginBottom: 20 }}>
          <p>O'qish rejimi:</p>
          <Switch
            checked={isReadingMode}
            onChange={(checked: boolean) => setIsReadingMode(checked)}
          />
        </div>

        {/* Grayscale */}
        <div style={{ marginBottom: 20 }}>
          <p>Grayscale rejimi:</p>
          <Switch
            checked={isGrayscale}
            onChange={(checked: boolean) => setIsGrayscale(checked)}
          />
        </div>

        {/* Underline Links */}
        <div style={{ marginBottom: 20 }}>
          <p>Havolalarni ostidan chiziq bilan belgilash:</p>
          <Switch
            checked={isUnderlineLinks}
            onChange={(checked: boolean) => setIsUnderlineLinks(checked)}
          />
        </div>

        {/* Hide Images */}
        <div style={{ marginBottom: 20 }}>
          <p>Rasmlarni yashirish:</p>
          <Switch
            checked={hideImages}
            onChange={(checked: boolean) => setHideImages(checked)}
          />
        </div>
      </Drawer>

      {/* Dynamic Styles */}
      <style>
        {`
          body {
            font-size: ${fontSize}px;
            line-height: ${lineSpacing};
          }
        `}
      </style>
    </div>
  );
};

export default AccessibilityDrawer;
