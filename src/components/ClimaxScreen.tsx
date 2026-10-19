import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Trophy, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface ClimaxScreenProps {
  playerName: string;
  playerClass: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  onProceedToResult: () => void;
}

export const ClimaxScreen: React.FC<ClimaxScreenProps> = ({
  playerName,
  playerClass,
  score,
  correctCount,
  totalQuestions,
  onProceedToResult,
}) => {
  useEffect(() => {
    sound.playBreakthrough();

    // Fire fireworks / confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#57d7d0', '#ffd36a', '#ffffff'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#7654c8', '#ffd36a', '#38bdf8'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center max-w-xl w-full mx-auto p-4 sm:p-6 my-auto">
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md w-full">
        {/* Eyebrow */}
        <span className="text-xs uppercase tracking-widest text-amber-400 font-black">
          Khung 15 · Độ kiếp phi thăng
        </span>

        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 mb-4 leading-tight">
          Thiên Kiếp Đã Vượt Qua!
        </h2>

        {/* Animated Orb / Emblem */}
        <div className="relative w-24 h-24 mx-auto my-4">
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-400 via-teal-300 to-indigo-500 p-1 cultivation-glow">
            <div className="w-full h-full rounded-full bg-[#09172c] flex items-center justify-center text-5xl">
              🌩️
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-2 rounded-full shadow-lg">
            <Trophy className="w-5 h-5" />
          </div>
        </div>

        {/* Note */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 my-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          Tu sĩ <b className="text-amber-300">{playerName}</b> (lớp <b className="text-teal-300">{playerClass}</b>) đã kiên cường vượt qua 10 cửa ải cam go, trả lời đúng <b className="text-emerald-400">{correctCount}/{totalQuestions}</b> câu hỏi và tích lũy được <b className="text-amber-400">{score}</b> điểm tu vi!
        </div>

        {/* Proceed Action Button */}
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onProceedToResult();
          }}
          className="w-full min-h-[50px] px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>Mở Bảng Phong Thần</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
