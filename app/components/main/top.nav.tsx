"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import LanguageSelect from "@/app/components/UI/language.select";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Timetable } from "@/types/templates/partners.types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/utils/store/Store";
import {
  handleCloseSearchModal,
  handleOpenSearchModal,
} from "@/app/utils/slices/search.slice";
import SearchModal from "@/app/components/UI/searchModal";
import SearchInput from "@/app/components/main/searchInput";
import SocialMedia from "@/app/components/UI/socialMedia";
import { useTranslations } from "next-intl";
import {
  HiOutlineSearch,
  HiOutlineX,
  HiOutlineChevronDown,
  HiOutlineEye,
  HiOutlineAdjustments,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineLink,
  HiOutlineCursorClick,
  HiOutlinePhotograph,
  HiOutlineEyeOff,
  HiOutlineRefresh,
  HiOutlinePause,
  HiOutlineMenuAlt1,
  HiOutlineColorSwatch,
  HiOutlineVolumeUp,
  HiOutlineVolumeOff,
} from "react-icons/hi";
import { IoMusicalNotes } from "react-icons/io5";

// ─── A11y types ───
type A11yKey =
  | "font-1" | "font-2" | "font-3" | "font-4"
  | "lh-1" | "lh-2" | "lh-3"
  | "ls-1" | "ls-2" | "ls-3"
  | "word-spacing" | "text-left" | "readable-font"
  | "grayscale" | "invert" | "dark" | "sepia" | "blue-filter"
  | "high-contrast" | "low-saturation"
  | "underline-links" | "highlight-links"
  | "big-cursor" | "stop-animations"
  | "focus-highlight" | "img-border" | "hide-images" | "reading-guide"
  | "screen-reader";

const A11Y_KEY = "nordic-a11y";
const ALL_KEYS: A11yKey[] = [
  "font-1","font-2","font-3","font-4",
  "lh-1","lh-2","lh-3",
  "ls-1","ls-2","ls-3",
  "word-spacing","text-left","readable-font",
  "grayscale","invert","dark","sepia","blue-filter","high-contrast","low-saturation",
  "underline-links","highlight-links","big-cursor","stop-animations",
  "focus-highlight","img-border","hide-images","reading-guide","screen-reader",
];
const EXCLUSIVE: A11yKey[][] = [
  ["font-1","font-2","font-3","font-4"],
  ["lh-1","lh-2","lh-3"],
  ["ls-1","ls-2","ls-3"],
  ["grayscale","invert","dark","sepia"],
];

// Slider group definitions
const FONT_STEPS: (A11yKey | null)[] = [null, "font-1", "font-2", "font-3", "font-4"];
const LH_STEPS: (A11yKey | null)[] = [null, "lh-1", "lh-2", "lh-3"];
const LS_STEPS: (A11yKey | null)[] = [null, "ls-1", "ls-2", "ls-3"];

const loadA11y = (): A11yKey[] => {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(A11Y_KEY) || "[]"); }
  catch { return []; }
};

// ─── Component ───
const TopNav = ({ props }: { props: Timetable[]; networks: any }) => {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const a = useTranslations("a11y");
  const buttons = useTranslations("buttons");
  const tEdu = useTranslations();
  const [searchText] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileDropOpen, setMobileDropOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState<A11yKey[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);

  const menuItems = useSelector((state: RootState) => state.menuSlice.activeMenu);
  const { isOpenSearch } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  const isHomePage = /^\/(uz|en|ru)?\/?$/.test(pathname);
  const navClass = isHomePage || menuItems ? "nav-bg-opacity" : "bg-dark_blue_color";

  useEffect(() => {
    const s = loadA11y();
    setActive(s);
    s.forEach((k) => document.documentElement.classList.add(`a11y-${k}`));
  }, []);

  const apply = useCallback((keys: A11yKey[]) => {
    ALL_KEYS.forEach((k) => document.documentElement.classList.remove(`a11y-${k}`));
    keys.forEach((k) => document.documentElement.classList.add(`a11y-${k}`));
    localStorage.setItem(A11Y_KEY, JSON.stringify(keys));
    setActive(keys);
  }, []);

  const toggle = useCallback((key: A11yKey) => {
    let next = [...active];
    for (const g of EXCLUSIVE) {
      if (g.includes(key)) next = next.filter((k) => !g.includes(k) || k === key);
    }
    next = next.includes(key) ? next.filter((k) => k !== key) : [...next, key];
    apply(next);
  }, [active, apply]);

  // Slider: set a specific step from a group
  const setSlider = useCallback((steps: (A11yKey | null)[], value: number) => {
    let next = [...active];
    // Remove all from this group
    const groupKeys = steps.filter(Boolean) as A11yKey[];
    next = next.filter((k) => !groupKeys.includes(k));
    // Add selected if not 0
    const selected = steps[value];
    if (selected) next.push(selected);
    apply(next);
  }, [active, apply]);

  // Get current slider value
  const getSliderVal = (steps: (A11yKey | null)[]): number => {
    for (let i = steps.length - 1; i >= 1; i--) {
      if (steps[i] && active.includes(steps[i] as A11yKey)) return i;
    }
    return 0;
  };

  const reset = useCallback(() => apply([]), [apply]);
  const has = (key: A11yKey) => active.includes(key);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  useEffect(() => {
    if (!has("reading-guide") || !guideRef.current) return;
    const g = guideRef.current;
    const move = (e: MouseEvent) => { g.style.top = `${e.clientY}px`; };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [active]);

  // ─── Screen reader (TTS) — only en/ru ───
  const currentLang = pathname.split("/")[1] || "uz";
  const ttsSupported = currentLang === "en" || currentLang === "ru";

  const speak = useCallback((text: string) => {
    if (!ttsSupported || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = currentLang === "ru" ? "ru-RU" : "en-US";
    utter.rate = 0.95;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  }, [ttsSupported, currentLang]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    if (!has("screen-reader") || !ttsSupported) {
      stopSpeaking();
      return;
    }

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Skip buttons, inputs, links with no text, drawer elements
      if (target.closest("[data-a11y-drawer]")) return;

      const text = target.innerText?.trim();
      if (text && text.length > 0 && text.length < 5000) {
        speak(text);
      }
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      stopSpeaking();
    };
  }, [active, ttsSupported, speak, stopSpeaking]);

  // Stop TTS on reset
  useEffect(() => {
    if (!has("screen-reader")) stopSpeaking();
  }, [active]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") { e.preventDefault(); dispatch(handleOpenSearchModal()); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [dispatch]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) setMobileDropOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // ─── Toggle switch ───
  const Toggle = ({ k, icon, label }: { k: A11yKey; icon: React.ReactNode; label: string }) => {
    const on = has(k);
    return (
      <button
        onClick={() => toggle(k)}
        className="flex items-center justify-between w-full py-3 px-4 rounded-xl transition-all duration-150"
        style={{ backgroundColor: on ? "rgba(11,64,117,0.07)" : "transparent" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 32, height: 32, borderRadius: 8,
              backgroundColor: on ? "#0b4075" : "rgba(11,64,117,0.06)",
              color: on ? "#fff" : "#0b4075",
            }}
          >
            {icon}
          </span>
          <span style={{ fontSize: 13, color: on ? "#0b4075" : "#4b5563", fontWeight: on ? 600 : 400 }}>
            {label}
          </span>
        </div>
        {/* Switch */}
        <div
          className="flex-shrink-0"
          style={{
            width: 44, height: 24, borderRadius: 12, padding: 2,
            backgroundColor: on ? "#0b4075" : "#d1d5db",
            transition: "background-color 0.2s",
          }}
        >
          <div
            style={{
              width: 20, height: 20, borderRadius: 10,
              backgroundColor: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              transition: "transform 0.2s",
              transform: on ? "translateX(20px)" : "translateX(0)",
            }}
          />
        </div>
      </button>
    );
  };

  // ─── Range slider ───
  const RangeSlider = ({
    icon, label, steps, labels,
  }: {
    icon: React.ReactNode;
    label: string;
    steps: (A11yKey | null)[];
    labels: string[];
  }) => {
    const val = getSliderVal(steps);
    const max = steps.length - 1;
    return (
      <div className="py-3 px-4">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 32, height: 32, borderRadius: 8,
              backgroundColor: val > 0 ? "#0b4075" : "rgba(11,64,117,0.06)",
              color: val > 0 ? "#fff" : "#0b4075",
            }}
          >
            {icon}
          </span>
          <span style={{ fontSize: 13, color: val > 0 ? "#0b4075" : "#4b5563", fontWeight: val > 0 ? 600 : 400 }}>
            {label}
          </span>
          <span
            className="ml-auto text-xs font-medium px-2 py-0.5 rounded-md"
            style={{
              backgroundColor: val > 0 ? "rgba(11,64,117,0.08)" : "transparent",
              color: val > 0 ? "#0b4075" : "#9ca3af",
            }}
          >
            {labels[val]}
          </span>
        </div>
        <div className="flex items-center gap-3 pl-11">
          <input
            type="range"
            min={0}
            max={max}
            step={1}
            value={val}
            onChange={(e) => setSlider(steps, Number(e.target.value))}
            className="a11y-slider flex-1"
            style={{
              background: `linear-gradient(to right, #0b4075 ${(val / max) * 100}%, rgba(11,64,117,0.1) ${(val / max) * 100}%)`,
            }}
          />
        </div>
      </div>
    );
  };

  // Color mode cards
  const colorModes: { k: A11yKey; icon: React.ReactNode; label: string }[] = [
    { k: "grayscale", icon: <HiOutlineColorSwatch className="text-lg" />, label: a("grayscale") },
    { k: "invert", icon: <HiOutlineRefresh className="text-lg" />, label: a("invert") },
    { k: "dark", icon: <HiOutlineMoon className="text-lg" />, label: a("dark") },
    { k: "sepia", icon: <HiOutlineSun className="text-lg" />, label: a("sepia") },
  ];

  return (
    <>
      <div className={`py-2.5 ${navClass} border-b border-white/10 z-20 transition-colors`}>
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch(handleOpenSearchModal())}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <HiOutlineSearch className="text-white text-sm" />
              </button>

              <button
                onClick={() => setDrawerOpen(true)}
                className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  active.length > 0 ? "bg-white/30" : "bg-white/10 hover:bg-white/20"
                }`}
                title={a("title")}
              >
                <HiOutlineEye className="text-white text-sm" />
                {active.length > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 rounded-full text-[8px] font-bold flex items-center justify-center text-white"
                    style={{ width: 14, height: 14, backgroundColor: "#e74c3c" }}
                  >
                    {active.length}
                  </span>
                )}
              </button>

              <Link
                href="https://www.green.nordicuniversity.org/"
                target="_blank"
                className="px-3.5 py-1.5 bg-[#2d6a31] text-white text-xs font-medium rounded-full hover:bg-[#245828] transition-colors uppercase"
              >
                {buttons("green_university")}
              </Link>

              <div className="hidden lg:flex items-center gap-1">
                {props.slice(0, 3).map((r, i) => (
                  <Link key={i} href={r.link} target="_blank" className="px-2.5 py-1 text-white/80 hover:text-white text-xs uppercase transition-colors">
                    {r.name}
                  </Link>
                ))}
                {props.length > 3 && (
                  <div ref={moreRef} className="relative">
                    <button onClick={() => setMoreOpen(!moreOpen)} className="flex items-center gap-1 px-2.5 py-1 text-white/80 hover:text-white text-xs transition-colors">
                      {t("more")}
                      <HiOutlineChevronDown className={`text-[10px] transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
                    </button>
                    {moreOpen && (
                      <div className="absolute top-full left-0 mt-1.5 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50 min-w-[180px]">
                        {props.slice(3).map((item, i) => (
                          <Link key={i} href={item.link} target="_blank" onClick={() => setMoreOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-text_secondary transition-colors">
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/anthem" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <IoMusicalNotes className="text-white text-sm" />
              </Link>
              <LanguageSelect color="white" />
              <div className="hidden md:block">
                <SocialMedia color="white" />
              </div>
            </div>
          </div>

          <div className="md:hidden mt-2" ref={mobileRef}>
            <button onClick={() => setMobileDropOpen(!mobileDropOpen)} className="flex items-center justify-center gap-1.5 w-full py-1.5 text-white/80 text-xs font-medium">
              {tEdu("education.recourse.sectionTitle")}
              <HiOutlineChevronDown className={`text-[10px] transition-transform duration-200 ${mobileDropOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileDropOpen && (
              <div className="mt-1 bg-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
                {props.map((item, i) => (
                  <Link key={i} href={item.link} target="_blank" onClick={() => setMobileDropOpen(false)} className="block px-4 py-2 text-xs text-white/90 hover:bg-white/10 uppercase transition-colors">
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Accessibility Drawer ─── */}
      {createPortal(
        <>
          <div
            className={`fixed inset-0 z-[9998] transition-opacity duration-300 ${drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            style={{ backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(3px)" }}
            onClick={() => setDrawerOpen(false)}
          />

          <div
            data-a11y-drawer
            className={`fixed top-0 right-0 z-[9999] h-full bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
            style={{ width: "440px", maxWidth: "92vw" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "rgba(11,64,117,0.08)" }}>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center"
                  style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(11,64,117,0.07)" }}
                >
                  <HiOutlineEye className="text-xl" style={{ color: "#0b4075" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0b4075" }}>{a("title")}</h3>
                  <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                    {active.length > 0 ? a("activeCount", { count: active.length }) : a("standardMode")}
                  </p>
                </div>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <HiOutlineX className="text-xl" />
              </button>
            </div>

            {/* Reset */}
            {active.length > 0 && (
              <div className="px-6 pt-4">
                <button
                  onClick={reset}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ color: "#c0392b", backgroundColor: "rgba(231,76,60,0.06)", border: "1px solid rgba(231,76,60,0.12)" }}
                >
                  <HiOutlineRefresh className="text-base" />
                  {a("reset")}
                </button>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-10" style={{ scrollbarWidth: "thin" }}>

              {/* ── Font size slider ── */}
              <div className="mt-6">
                <SectionTitle icon={<HiOutlineAdjustments />} title={a("fontSize")} />
                <div className="mt-2">
                  <RangeSlider
                    icon={<FontSizeIcon />}
                    label={a("fontSizeLabel")}
                    steps={FONT_STEPS}
                    labels={[a("standard"), "110%", "125%", "150%", "180%"]}
                  />
                </div>
              </div>

              {/* ── Text formatting ── */}
              <div className="mt-6">
                <SectionTitle icon={<HiOutlineMenuAlt1 />} title={a("textFormat")} />
                <div className="mt-2">
                  <RangeSlider
                    icon={<LineHeightIcon />}
                    label={a("lineHeight")}
                    steps={LH_STEPS}
                    labels={[a("standard"), "1.7x", "2.0x", "2.4x"]}
                  />
                  <RangeSlider
                    icon={<LetterSpacingIcon />}
                    label={a("letterSpacing")}
                    steps={LS_STEPS}
                    labels={[a("standard"), a("lsSmall"), a("lsMedium"), a("lsLarge")]}
                  />
                  <div className="space-y-1 mt-1">
                    <Toggle k="word-spacing" icon={<WordSpacingIcon />} label={a("wordSpacing")} />
                    <Toggle k="text-left" icon={<HiOutlineMenuAlt1 className="text-base" />} label={a("alignLeft")} />
                    <Toggle k="readable-font" icon={<ReadableFontIcon />} label={a("readableFont")} />
                  </div>
                </div>
              </div>

              {/* ── Color modes ── */}
              <div className="mt-7">
                <SectionTitle icon={<HiOutlineColorSwatch />} title={a("colorMode")} />
                <div className="grid grid-cols-4 gap-2.5 mt-3">
                  {colorModes.map((c) => {
                    const on = has(c.k);
                    return (
                      <button
                        key={c.k}
                        onClick={() => toggle(c.k)}
                        className="flex flex-col items-center gap-2.5 py-4 rounded-xl transition-all duration-150"
                        style={{
                          backgroundColor: on ? "rgba(11,64,117,0.08)" : "rgba(11,64,117,0.02)",
                          border: on ? "2px solid #0b4075" : "2px solid rgba(11,64,117,0.06)",
                        }}
                      >
                        <span
                          className="flex items-center justify-center"
                          style={{
                            width: 40, height: 40, borderRadius: 10,
                            backgroundColor: on ? "#0b4075" : "rgba(11,64,117,0.06)",
                            color: on ? "#fff" : "#0b4075",
                          }}
                        >
                          {c.icon}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 500, color: on ? "#0b4075" : "#6b7280" }}>
                          {c.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Contrast ── */}
              <div className="mt-7">
                <SectionTitle icon={<HiOutlineSun />} title={a("contrast")} />
                <div className="mt-2 space-y-1">
                  <Toggle k="high-contrast" icon={<HiOutlineSun className="text-base" />} label={a("highContrast")} />
                  <Toggle k="low-saturation" icon={<HiOutlineAdjustments className="text-base" />} label={a("lowSaturation")} />
                  <Toggle k="blue-filter" icon={<BlueFilterIcon />} label={a("blueFilter")} />
                </div>
              </div>

              {/* ── Links ── */}
              <div className="mt-7">
                <SectionTitle icon={<HiOutlineLink />} title={a("links")} />
                <div className="mt-2 space-y-1">
                  <Toggle k="underline-links" icon={<HiOutlineLink className="text-base" />} label={a("underlineLinks")} />
                  <Toggle k="highlight-links" icon={<HighlightIcon />} label={a("highlightLinks")} />
                  <Toggle k="focus-highlight" icon={<HiOutlineCursorClick className="text-base" />} label={a("focusHighlight")} />
                  <Toggle k="reading-guide" icon={<ReadingGuideIcon />} label={a("readingGuide")} />
                </div>
              </div>

              {/* ── Screen reader (TTS) ── */}
              <div className="mt-7">
                <SectionTitle icon={<HiOutlineVolumeUp />} title={a("screenReader")} />
                <div className="mt-2">
                  <Toggle
                    k="screen-reader"
                    icon={has("screen-reader")
                      ? <HiOutlineVolumeUp className="text-base" />
                      : <HiOutlineVolumeOff className="text-base" />
                    }
                    label={a("readText")}
                  />
                  {has("screen-reader") && (
                    <div className="px-4 pb-2">
                      {ttsSupported ? (
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                            style={{ backgroundColor: "rgba(11,64,117,0.07)", color: "#0b4075" }}
                          >
                            {currentLang === "en" ? "English" : "Русский"}
                          </span>
                          {isSpeaking && (
                            <button
                              onClick={stopSpeaking}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
                              style={{ backgroundColor: "rgba(231,76,60,0.08)", color: "#c0392b" }}
                            >
                              <HiOutlinePause className="text-xs" />
                              {a("stop")}
                            </button>
                          )}
                          <span className="text-[11px]" style={{ color: "#9ca3af" }}>
                            {a("clickText")}
                          </span>
                        </div>
                      ) : (
                        <p className="mt-1 text-xs" style={{ color: "#e67e22" }}>
                          {a("ttsUnsupported")}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Visual ── */}
              <div className="mt-7">
                <SectionTitle icon={<HiOutlineEye />} title={a("visual")} />
                <div className="mt-2 space-y-1">
                  <Toggle k="big-cursor" icon={<HiOutlineCursorClick className="text-base" />} label={a("bigCursor")} />
                  <Toggle k="stop-animations" icon={<HiOutlinePause className="text-base" />} label={a("stopAnimations")} />
                  <Toggle k="img-border" icon={<HiOutlinePhotograph className="text-base" />} label={a("imgBorder")} />
                  <Toggle k="hide-images" icon={<HiOutlineEyeOff className="text-base" />} label={a("hideImages")} />
                </div>
              </div>
            </div>
          </div>

          {/* Reading guide bar */}
          {active.includes("reading-guide") && (
            <div
              ref={guideRef}
              className="fixed left-0 w-full pointer-events-none z-[9990]"
              style={{
                height: "3px",
                backgroundColor: "rgba(231,76,60,0.5)",
                boxShadow: "0 0 12px rgba(231,76,60,0.3)",
                top: "50%",
                transition: "top 0.05s linear",
              }}
            />
          )}
        </>,
        document.body,
      )}

      {/* Search modal */}
      {isOpenSearch && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm"
          onClick={() => dispatch(handleCloseSearchModal())}
        >
          <div className="bg-white rounded-xl w-full max-w-[720px] mx-4 overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-800">Qidiruv</h3>
              <button onClick={() => dispatch(handleCloseSearchModal())} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <HiOutlineX className="text-lg" />
              </button>
            </div>
            <div className="p-5">
              <SearchInput />
              <SearchModal searchModal={searchText} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ─── Section title ───
const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center gap-2">
    <span style={{ fontSize: 14, color: "rgba(11,64,117,0.4)" }}>{icon}</span>
    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(11,64,117,0.45)" }}>
      {title}
    </span>
  </div>
);

// ─── SVG Icons ───
const FontSizeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" stroke="none">
    <text x="1" y="13" fontSize="14" fontWeight="bold">A</text>
  </svg>
);

const LineHeightIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
    <line x1="6" y1="3" x2="14" y2="3" />
    <line x1="6" y1="8" x2="14" y2="8" />
    <line x1="6" y1="13" x2="14" y2="13" />
    <path d="M2.5 5V2M2.5 5L1.5 4M2.5 5L3.5 4" />
    <path d="M2.5 11V14M2.5 11L1.5 12M2.5 11L3.5 12" />
  </svg>
);

const LetterSpacingIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
    <path d="M1 12h14" />
    <path d="M3 12L1 12" />
    <path d="M15 12L13 12" />
    <text x="3" y="9" fontSize="8" fill="currentColor" stroke="none" fontWeight="bold">ab</text>
  </svg>
);

const WordSpacingIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
    <line x1="0" y1="13" x2="16" y2="13" />
    <text x="1" y="9" fontSize="7" fill="currentColor" stroke="none" fontWeight="bold">A</text>
    <text x="9" y="9" fontSize="7" fill="currentColor" stroke="none" fontWeight="bold">B</text>
    <path d="M6 8L8 8" strokeDasharray="1 1.5" />
  </svg>
);

const ReadableFontIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" stroke="none">
    <text x="1" y="12" fontSize="11" fontFamily="Arial" fontWeight="bold">Aa</text>
  </svg>
);

const BlueFilterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="8" cy="8" r="6" />
    <path d="M8 2a6 6 0 010 12" fill="currentColor" opacity="0.15" />
  </svg>
);

const HighlightIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
    <rect x="2" y="5" width="12" height="6" rx="1" fill="currentColor" opacity="0.12" />
    <line x1="4" y1="8" x2="12" y2="8" />
  </svg>
);

const ReadingGuideIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
    <line x1="0" y1="8" x2="16" y2="8" />
    <line x1="3" y1="4" x2="13" y2="4" opacity="0.25" />
    <line x1="3" y1="12" x2="13" y2="12" opacity="0.25" />
  </svg>
);

export default TopNav;
