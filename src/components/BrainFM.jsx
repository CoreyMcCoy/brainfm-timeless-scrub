/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  ChevronDown,
  Disc3,
  Flame,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  ThumbsDown,
  Heart,
  Share2,
  X,
  Github,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/**
 * Landing page that showcases a mobile mockup of Brain.fm with the TIMELESS scrub bar.
 * One file. Drop into Next.js App Router or any React environment with Tailwind.
 */

/* ------------------------
   Reusable Player (Mobile)
   ------------------------ */
function BrainFmPlayerMobile() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35); // 0..100
  const barRef = useRef(null);
  const draggingRef = useRef(false);

  // Simulate playback progress when playing (visual only)
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.35));
    }, 120);
    return () => clearInterval(id);
  }, [isPlaying]);

  // Helpers
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const calcProgressFromEvent = (clientX) => {
    const bar = barRef.current;
    if (!bar) return progress;
    const rect = bar.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);
    return (x / rect.width) * 100;
  };

  // Global drag listeners
  useEffect(() => {
    const onMove = (e) => {
      if (!draggingRef.current) return;
      setProgress(calcProgressFromEvent(e.clientX));
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  // Touch drag
  useEffect(() => {
    const onTouchMove = (e) => {
      if (!draggingRef.current) return;
      const t = e.touches[0];
      if (!t) return;
      setProgress(calcProgressFromEvent(t.clientX));
    };
    const onTouchEnd = () => {
      draggingRef.current = false;
    };
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const handleBarClick = (e) => setProgress(calcProgressFromEvent(e.clientX));
  const handleBarMouseDown = (e) => {
    draggingRef.current = true;
    setProgress(calcProgressFromEvent(e.clientX));
  };
  const handleTouchStart = (e) => {
    draggingRef.current = true;
    const t = e.touches[0];
    if (t) setProgress(calcProgressFromEvent(t.clientX));
  };

  const handlePrev = () => setProgress(0); // restart
  const handleNext = () => setProgress(100); // jump to end
  const togglePlay = () => setIsPlaying((v) => !v);

  return (
    <div className="w-full h-full flex flex-col text-white relative">
      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Disc3 className="w-4 h-4" />
          <p className="text-xs">Custom Focus Mix</p>
          <ChevronDown className="w-4 h-4 opacity-70" />
        </div>
        <div className="flex items-center gap-4 bg-amber-50/10 px-3 py-1 rounded-full">
          <div className="flex items-center gap-1 text-sm">
            <Flame className="w-3 h-3" />
            <p className="text-xs">76</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center relative">
        <div className="text-xs font-medium uppercase tracking-widest opacity-70">
          In Focus
        </div>
        <div className="mt-1 text-7xl tracking-wider font-medium">58:39</div>
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
          <ChevronDown className="w-4 h-4" />
          Infinite Play
        </div>
        {/* Right-side vertical buttons */}
        <div className="absolute right-3 bottom-0 flex flex-col gap-4 items-center">
          <button className="p-0 m-0 flex items-center justify-center">
            <ThumbsDown className="w-5 h-5 opacity-80" />
          </button>
          <button className="p-0 m-0 flex items-center justify-center">
            <Heart className="w-5 h-5 opacity-80" />
          </button>
          <button className="p-0 m-0 flex items-center justify-center">
            <Share2 className="w-5 h-5 opacity-80" />
          </button>
        </div>
      </div>

      {/* Artwork + meta */}
      <div className="px-5 pb-4">
        <div className="font-semibold">Sunday Afternoon</div>
        <div className="text-xs opacity-75 mt-1">Medium Neural Effect</div>
      </div>

      {/* Transport cluster (prev / play / next) */}
      <div className="px-5 mt-2 flex items-center justify-between">
        {/* Prev */}
        <button
          onClick={handlePrev}
          aria-label="Previous/Restart"
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
        >
          <SkipBack className="w-4 h-4" />
        </button>
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="w-16 h-16 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        {/* Next */}
        <button
          onClick={handleNext}
          aria-label="Next"
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Timeless Scrub */}
      <div className="px-5 mt-6 mb-6">
        <div className="relative h-2 w-full">
          <div
            ref={barRef}
            className="relative h-1 w-full bg-white/15 rounded-full cursor-pointer transition-colors hover:bg-white/25"
            onClick={handleBarClick}
            onMouseDown={handleBarMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div
              className="absolute left-0 top-0 h-1 bg-white rounded-full"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute -top-1.5"
              style={{ left: `calc(${progress}% - 8px)` }}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------
   Landing Page
   ------------------------ */
export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <main className="min-h-screen bg-[#12021b] text-white">
      <section className="max-w-6xl mx-auto">
        {/* Two grid layout with padding */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 pt-24">
          {/* Explanation */}
          <div className="max-w-lg">
            <h1 className="text-4xl font-medium">
              Brain.fm • Timeless Scrub Concept
            </h1>
            <p className="mt-4 text-white/80">
              I understand Brain.fm is designed to be minimal and
              distraction-free. But the app already includes{' '}
              <span className="font-semibold italic hover:underline underline-offset-2">
                Prev
              </span>{' '}
              and{' '}
              <span className="font-semibold italic hover:underline underline-offset-2">
                Next
              </span>{' '}
              buttons.
            </p>
            <p className="mt-4 text-white/80">
              Those controls suggest some navigation is allowed, yet they don't
              let me do basic things like, restart a track, or rewind a moment I
              want to replay.
            </p>
            <p className="mt-4 text-white/80">
              Right now, if I want to restart, I have to hack it by going to the
              next track, and then back to the previous track. That's an
              unnecessary amount of friction. (And it's frustrating)
            </p>
            <h2 className="mt-6 font-medium">
              Proposed Enhancement: Timeless Scrub Bar
            </h2>
            <p className="mt-2 text-white/80">
              Introduce a simple "distraction-less" scrub line:
            </p>
            <ul className="list-disc list-inside mt-2 text-white/80 space-y-1">
              <li>Tap the prev = instant restart</li>
              <li>Drag slightly = rewind or forward</li>
              <li>No numbers or distraction</li>
              <li>Fits the existing aesthetic</li>
            </ul>
            <p className="mt-8 text-white/80">
              <button
                onClick={() => setIsModalOpen(true)}
                className="font-semibold italic hover:underline underline-offset-2 text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
              >
                <span className="lg:hidden">
                  See how it works. Open mockup →
                </span>
                <span className="hidden lg:inline">
                  See how it works. Open the mockup →
                </span>
              </button>
            </p>
          </div>
          {/* Mobile mockup - static preview (desktop only) */}
          <div className="hidden lg:flex items-center justify-center p-4">
            {/* Phone frame with reduced width */}
            <div className="w-80 h-[600px] rounded-[36px] bg-gradient-to-b from-white/10 to-white/5 p-2 shadow-2xl">
              <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-[url('https://images.unsplash.com/photo-1688494930098-e88c53c26e3a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687')] bg-cover bg-center">
                {/* Notch */}
                <div className="absolute left-1/2 -translate-x-1/2 top-2 w-28 h-1.5 rounded-full bg-white/30" />
                {/* App content */}
                <BrainFmPlayerMobile />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-8 pt-12 pb-6 text-sm text-white/60">
          Built thoughtfully by{' '}
          <a
            href="https://coreymccoy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold italic hover:underline underline-offset-2"
          >
            Corey McCoy.
          </a>
        </footer>
      </section>

      {/* Interactive Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-700"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative animate-in zoom-in-95 duration-700 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Phone frame - larger in modal */}
            <div className="w-[340px] sm:w-96 h-[680px] sm:h-[750px] rounded-[40px] bg-gradient-to-b from-white/10 to-white/5 p-2 shadow-2xl">
              <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-[url('https://images.unsplash.com/photo-1688494930098-e88c53c26e3a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687')] bg-cover bg-center">
                {/* Notch */}
                <div className="absolute left-1/2 -translate-x-1/2 top-2 w-28 h-1.5 rounded-full bg-white/30" />
                {/* App content */}
                <BrainFmPlayerMobile />
              </div>
            </div>

            {/* Hint text */}
            <p className="text-center text-white/60 text-sm mt-4">
              Press ESC or click outside to close
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

/** Lightweight runtime assertions (simple tests) */
if (typeof window !== 'undefined') {
  const _clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  console.assert(_clamp(-10, 0, 100) === 0, 'clamp below min');
  console.assert(_clamp(150, 0, 100) === 100, 'clamp above max');
  console.assert(_clamp(42, 0, 100) === 42, 'clamp within');

  // Progress math checks
  const width = 200;
  const left = 100;
  const at = (clientX) =>
    (Math.max(0, Math.min(width, clientX - left)) / width) * 100;
  console.assert(Math.round(at(100)) === 0, 'progress at start');
  console.assert(Math.round(at(200)) === 50, 'progress at middle');
  console.assert(Math.round(at(300)) === 100, 'progress at end');
}
