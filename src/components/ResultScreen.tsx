import React from 'react';
import { Award, CheckCircle, Percent, BookOpen, ArrowRight } from 'lucide-react';
import { LeaderboardEntry, REALMS, TREASURE_INFO } from '../types';
import { sound } from '../utils/sound';

interface ResultScreenProps {
  playerName: string;
  playerClass: string;
  score: number;
  correctCount: number;
  realmIndex: number;
  leaderboard: LeaderboardEntry[];
  onReview: () => void;
  onProceedToClosing: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  playerName,
  score,
  correctCount,
  realmIndex,
  leaderboard,
  onReview,
  onProceedToClosing,
}) => {
  const finalRealm = REALMS[realmIndex];
  const accuracy = Math.round((correctCount / 10) * 100);

  let titleBadge = "Tu Sĩ Nhập Môn";
  if (realmIndex >= 9) {
    titleBadge = "Đại Năng Toán Học";
  } else if (realmIndex >= 7) {
    titleBadge = "Tu Sĩ Bản Lĩnh";
  } else if (realmIndex >= 5) {
    titleBadge = "Cao Thủ Tư Duy";
  }

  return (
    <div className="flex-1 flex flex-col justify-center max-w-3xl w-full mx-auto p-3 sm:p-6 my-auto">
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-md">
        {/* Screen Header */}
        <div className="text-center mb-4">
          <span className="text-xs uppercase tracking-widest text-teal-400 font-bold">
            Khung 16 · Bảng phong thần
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Bảng Thành Tích Tu Luyện
          </h2>
        </div>

        {/* Big Realm Badge */}
        <div className="text-center my-2 p-3 bg-gradient-to-r from-purple-950/60 via-indigo-950/70 to-purple-950/60 border border-purple-500/40 rounded-2xl">
          <span className="text-xs text-purple-300 font-bold uppercase tracking-wider block">
            Cảnh giới đạt được
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-300 tracking-wide mt-0.5 block">
            ✦ {finalRealm} ✦
          </span>
          <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            Danh hiệu: {titleBadge}
          </span>
        </div>

        {/* 3 Summary Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 my-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 text-center">
            <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <div className="text-lg sm:text-2xl font-black text-white tabular-nums">
              {score}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Tổng Tu Vi
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 text-center">
            <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <div className="text-lg sm:text-2xl font-black text-white tabular-nums">
              {correctCount}/10
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Số Câu Đúng
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 text-center">
            <Percent className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
            <div className="text-lg sm:text-2xl font-black text-white tabular-nums">
              {accuracy}%
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Độ Chính Xác
            </div>
          </div>
        </div>

        {/* Encouraging Word */}
        <p className="text-xs sm:text-sm text-slate-300 text-center leading-relaxed max-w-xl mx-auto my-3">
          Chúc mừng <b className="text-teal-300">{playerName}</b>! {accuracy >= 80 ? 'Khả năng tư duy toán học vô cùng sắc bén và vững vàng.' : 'Hãy tiếp tục rèn giũa để vững vàng thăng hoa trên con đường chinh phục tri thức!'}
        </p>

        {/* Leaderboard Table */}
        <div className="my-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
              Lưu danh phong thần (Lịch sử)
            </h4>
            <span className="text-[10px] text-slate-500">Gần đây</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="max-h-40 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60 text-[10px] uppercase font-bold tracking-wider">
                    <th className="p-2.5">Tu Sĩ</th>
                    <th className="p-2.5">Lớp</th>
                    <th className="p-2.5">Bảo Vật</th>
                    <th className="p-2.5 text-right">Tu Vi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {leaderboard.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-slate-500">
                        Chưa có dữ liệu phong thần.
                      </td>
                    </tr>
                  ) : (
                    leaderboard.slice(0, 5).map((row) => (
                      <tr key={row.id} className="hover:bg-slate-800/30">
                        <td className="p-2.5 font-bold text-white truncate max-w-[100px]">
                          {row.name}
                        </td>
                        <td className="p-2.5 text-slate-300">{row.className}</td>
                        <td className="p-2.5 text-slate-400">
                          {TREASURE_INFO[row.treasure]?.name || row.treasure}
                        </td>
                        <td className="p-2.5 text-right font-black text-amber-400">
                          {row.score} pt
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-5">
          <button
            type="button"
            onClick={() => {
              sound.playTap();
              onReview();
            }}
            className="w-full sm:flex-1 min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>Xem lời giải chi tiết 10 câu</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playTap();
              onProceedToClosing();
            }}
            className="w-full sm:flex-1 min-h-[48px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-teal-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Khép lại hành trình</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
