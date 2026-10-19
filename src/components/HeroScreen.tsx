import React from 'react';
import { motion } from 'motion/react';
import { Award, Zap, Shield, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeroScreenProps {
  onStart: () => void;
  onOpenLeaderboard: () => void;
}

export const HeroScreen: React.FC<HeroScreenProps> = ({ onStart, onOpenLeaderboard }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-4 sm:p-8 max-w-3xl mx-auto my-auto">
      {/* Mystical Orb */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mb-4"
      >
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[40%_60%_60%_40%/50%_50%_50%_50%] bg-gradient-to-tr from-teal-300 via-sky-400 to-indigo-500 p-1 shadow-2xl shadow-cyan-500/30 cultivation-glow">
          <div className="w-full h-full rounded-[40%_60%_60%_40%/50%_50%_50%_50%] bg-[#0a182c] flex items-center justify-center text-4xl sm:text-5xl select-none">
            🧙🏻‍♂️
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-950 p-1.5 rounded-full shadow-lg text-xs font-black">
          <Sparkles className="w-4 h-4" />
        </div>
      </motion.div>

      {/* Eyebrow */}
      <div className="text-xs sm:text-sm uppercase tracking-widest text-teal-400 font-bold mb-1">
        Hành trình khai mở trí tuệ
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-2">
        Tu Tiên <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-amber-300 bg-clip-text text-transparent">Toán Học</span>
      </h1>

      {/* Motto Banner */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="inline-block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black px-4 py-1.5 sm:px-6 sm:py-2 rounded-xl shadow-lg shadow-amber-500/20 text-xs sm:text-sm uppercase tracking-wide my-2 border border-amber-200"
      >
        "ĐIỂM SỐ CỦA TA, DO TA QUYẾT ĐỊNH!"
      </motion.div>

      {/* Author Brand */}
      <div className="text-xs sm:text-sm font-bold text-slate-400 mb-4 flex items-center justify-center gap-1.5">
        <span className="text-amber-400">✦</span>
        <span>ĐẠI NĂNG NGUYỄN TUẤN ANH – 0824049191</span>
        <span className="text-amber-400">✦</span>
      </div>

      {/* Story Introduction */}
      <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed mb-6">
        Chào mừng đến thế giới tu tiên Toán học! Nơi tri thức là linh lực, tư duy là thần thông và mười cửa ải cam go đang chờ đón các tu sĩ xuất sắc nhất phá vỡ cảnh giới, bước lên đỉnh vinh quang.
      </p>

      {/* Feature Highlights Pills */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-md mb-6 text-left">
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-2.5 flex flex-col items-center text-center">
          <Zap className="w-4 h-4 text-amber-400 mb-1" />
          <span className="text-xs font-bold text-white">10 Cảnh Giới</span>
          <span className="text-[10px] text-slate-400">Từ Luyện Khí tới Phi Thăng</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-2.5 flex flex-col items-center text-center">
          <Shield className="w-4 h-4 text-teal-400 mb-1" />
          <span className="text-xs font-bold text-white">Tam Đại Pháp Bảo</span>
          <span className="text-[10px] text-slate-400">Ngọc Như Ý, Thời Gian, Đại Diễn</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-2.5 flex flex-col items-center text-center">
          <Award className="w-4 h-4 text-purple-400 mb-1" />
          <span className="text-xs font-bold text-white">Phong Thần Bảng</span>
          <span className="text-[10px] text-slate-400">Lưu danh sử sách</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onStart();
          }}
          className="w-full min-h-[50px] px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-400 via-cyan-300 to-sky-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-teal-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>BẮT ĐẦU TU LUYỆN</span>
          <span className="text-lg">➜</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onOpenLeaderboard();
          }}
          className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/80 text-slate-200 font-bold text-xs sm:text-sm active:scale-95 transition-all whitespace-nowrap"
        >
          Bảng Phong Thần 📜
        </button>
      </div>
    </div>
  );
};
