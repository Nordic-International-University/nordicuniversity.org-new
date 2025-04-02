"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  FaPlay,
  FaPause,
  FaMusic,
  FaShareAlt,
  FaVolumeUp,
  FaTimes,
  FaStepForward,
  FaStepBackward,
  FaListUl,
} from "react-icons/fa";
import { AudioBookDetailType } from "@/types/research/scince_events";
import { getAudioBookDetailBySlug } from "@/app/[lang]/research/audio-books/api";
import getCurrentLangClient from "@/app/helpers/getCurrentLang";
import { useTranslations } from "next-intl";

const Page = () => {
  const { slug } = useParams();
  const [album, setAlbum] = useState<AudioBookDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null,
  );
  const t = useTranslations("audio_books");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isDraggingRef = useRef(false);
  const lang = getCurrentLangClient();

  const handlePlay = (track: any) => {
    const index = album?.audio_books.findIndex((t) => t.id === track.id) || 0;
    setCurrentTrackIndex(index);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleClosePlayer = () => {
    setCurrentTrack(null);
    setIsPlaying(false);
    audioRef.current?.pause();
  };

  const playNextTrack = () => {
    if (album && currentTrackIndex !== null) {
      let nextIndex = currentTrackIndex + 1;
      while (nextIndex < album.audio_books.length) {
        const nextTrack = album.audio_books[nextIndex];
        if (nextTrack.audio.is_audio) {
          setCurrentTrack(nextTrack);
          setCurrentTrackIndex(nextIndex);
          setIsPlaying(true);
          return;
        }
        nextIndex++;
      }
    }
  };

  const playPrevTrack = () => {
    if (album && currentTrackIndex !== null) {
      let prevIndex = currentTrackIndex - 1;
      while (prevIndex >= 0) {
        const prevTrack = album.audio_books[prevIndex];
        if (prevTrack.audio.is_audio) {
          setCurrentTrack(prevTrack);
          setCurrentTrackIndex(prevIndex);
          setIsPlaying(true);
          return;
        }
        prevIndex--;
      }
    }
  };

  useEffect(() => {
    if (typeof slug === "string") {
      getAudioBookDetailBySlug(slug, lang)
        .then((data: any) => {
          setAlbum(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching album:", err);
          setLoading(false);
        });
    }
  }, [slug]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  if (loading) return <div className="p-10 text-center">Загрузка...</div>;
  if (!album) return <div className="p-10 text-center">Ничего не найдено.</div>;

  return (
    <section className="mt-10">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative w-full md:w-64 h-64 rounded-xl overflow-hidden shadow-md">
            <Image
              src={process.env.NEXT_PUBLIC_URL_BACKEND + album.image.file_path}
              alt={album.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-500">
              {t("album")} • {album.year}
            </p>
            <h1 className="text-4xl font-bold mb-2">{album.name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                <span className="text-blue-600 font-semibold">{}</span>
                {t("trackCount", { count: album.count_of_audio })}
              </span>
              <span>
                {t("durationMinutes", {
                  minutes: Math.ceil(album.total_duration / 60),
                })}
              </span>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                className="p-2 rounded-full bg-secondary text-white"
                onClick={() => {
                  const index = album.audio_books.findIndex(
                    (t) => t.audio.is_audio,
                  );
                  const firstAudio = album.audio_books[index];
                  if (firstAudio) {
                    setCurrentTrack(firstAudio);
                    setCurrentTrackIndex(index);
                    setIsPlaying(true);
                  }
                }}
              >
                <FaPlay className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-full border text-gray-700 hover:text-black"
                onClick={() => {
                  if (navigator.share) {
                    navigator
                      .share({
                        title: album.name,
                        url: window.location.href,
                      })
                      .then(() => console.log("Shared!"))
                      .catch((err) => console.error("Share failed:", err));
                  } else {
                    alert("Sharing not supported on this browser.");
                  }
                }}
              >
                <FaShareAlt className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tracklist */}
        <div className="mt-12">
          <div className="mt-10 space-y-3">
            {album.audio_books.map((track, index) => (
              <div
                key={track.id}
                onClick={() => handlePlay(track)}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 w-6 text-right">
                    {index + 1}
                  </span>
                  <div className="relative w-12 h-12 rounded overflow-hidden">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_URL_BACKEND +
                        album.image.file_path
                      }
                      alt="track-thumb"
                      fill
                      className="object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <FaPlay className="text-white w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{track.name}</p>
                    <p className="text-xs text-gray-500">{track.author_name}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 min-w-[50px] text-right">
                  {track.audio.duration
                    ? new Date(track.audio.duration * 1000)
                        .toISOString()
                        .substr(14, 5)
                    : "—"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Audio Player */}
        {currentTrack && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#f6fdfd] border-t z-50 shadow-lg">
            {/* SEEK BAR */}
            <div className="w-full px-4 pt-2">
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={progress}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setProgress(value);
                  if (audioRef.current) {
                    audioRef.current.currentTime = value;
                  }
                }}
                className="w-full h-1 accent-secondary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between px-4 py-2">
              {/* Left Info */}
              <div className="flex items-center gap-4">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_URL_BACKEND + album.image.file_path
                  }
                  alt={currentTrack.name}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <div>
                  <div className="text-sm font-semibold">
                    {currentTrack.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {currentTrack.author_name}
                  </div>
                </div>
              </div>
              <div className="flex absolute left-[50%] -translate-x-[50%] items-center gap-3">
                <FaStepBackward
                  className="w-5 h-5 cursor-pointer text-gray-700"
                  onClick={playPrevTrack}
                />
                <button
                  className="text-gray-800 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <FaPause className="w-4 h-4" />
                  ) : (
                    <FaPlay className="w-4 h-4" />
                  )}
                </button>
                <FaStepForward
                  className="w-5 h-5 cursor-pointer text-gray-700"
                  onClick={playNextTrack}
                />
              </div>

              <div className="flex items-center gap-3">
                <FaVolumeUp className="w-4 h-4 text-gray-700" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(e) => {
                    if (audioRef.current) {
                      audioRef.current.volume = parseFloat(e.target.value);
                    }
                  }}
                  className="accent-secondary"
                  defaultValue={1}
                />
                <FaTimes
                  className="w-5 h-5 cursor-pointer text-gray-700"
                  onClick={handleClosePlayer}
                />
              </div>
            </div>

            {/* Audio Element */}
            <audio
              ref={audioRef}
              src={
                process.env.NEXT_PUBLIC_URL_BACKEND +
                currentTrack.audio.file_path
              }
              onTimeUpdate={() => {
                if (audioRef.current && !isDraggingRef.current) {
                  setProgress(audioRef.current.currentTime);
                }
              }}
              onLoadedMetadata={() => {
                if (audioRef.current) {
                  setDuration(audioRef.current.duration);
                }
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
