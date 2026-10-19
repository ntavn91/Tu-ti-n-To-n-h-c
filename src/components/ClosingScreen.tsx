import React from 'react';
import { RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface ClosingScreenProps {
  playerName: string;
  onRestart: () => void;
  onOpenLeaderboard: () => void;
}

export const ClosingScreen: React.FC<ClosingScreenProps> = ({
  playerName,
  onRestart,
  onOpenLeaderboard,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center max-w-xl w-full mx-auto p-4 sm:p-6 my-auto">
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md w-full">
        {/* Orb */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-tr from-teal-400 via-indigo-400 to-amber-400 p-1 mb-4 shadow-xl shadow-cyan-500/20 cultivation-glow">
          <div className="w-full h-full rounded-3xl bg-[#0a182c] flex items-center justify-center text-4xl sm:text-5xl">
            🏯
          </div>
        </div>

        {/* Eyebrow */}
        <span className="text-xs uppercase tracking-widest text-teal-400 font-bold">
          Khung 17 · Lời kết
        </span>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-3">
          Hành Trình Khép Lại, Tri Thức Ở Lại
        </h2>

        {/* Motto Banner */}
        <div className="inline-block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black px-4 py-1.5 rounded-xl shadow-lg shadow-amber-500/20 text-xs sm:text-sm uppercase tracking-wide my-2 border border-amber-200">
          "ĐIỂM SỐ CỦA TA, DO TA QUYẾT ĐỊNH!"
        </div>

        {/* Note */}
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed my-4">
          Chúc mừng tu sĩ <b className="text-amber-300">{playerName || "đồng đạo"}</b> đã hoàn thành chặng đường tu luyện. Hãy luôn ghi nhớ: Tinh thần bền bỉ và sự nỗ lực tự thân chính là chìa khóa mở ra mọi cánh cửa tri thức!
        </p>

        {/* Author Contact */}
        <div className="text-xs font-bold text-slate-400 mb-6 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>ĐẠI NĂNG NGUYỄN TUẤN ANH – 0824049191</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playTap();
              onRestart();
            }}
            className="w-full sm:flex-1 min-h-[50px] px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-400 via-cyan-300 to-sky-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-teal-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Bắt đầu hành trình mới</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playTap();
              onOpenLeaderboard();
            }}
            className="w-full sm:flex-1 min-h-[48px] px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Xem Bảng Phong Thần</span>
          </button>
        </div>
      </div>
    </div>
  );
};
