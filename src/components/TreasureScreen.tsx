import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { TreasureType, TREASURE_INFO } from '../types';
import { sound } from '../utils/sound';

interface TreasureScreenProps {
  onSelectAndStart: (treasure: TreasureType) => void;
  onBack: () => void;
}

export const TreasureScreen: React.FC<TreasureScreenProps> = ({
  onSelectAndStart,
  onBack,
}) => {
  const [selected, setSelected] = useState<TreasureType | null>(null);

  const treasures: TreasureType[] = ['jade', 'time', 'skip'];

  const handleSelect = (t: TreasureType) => {
    setSelected(t);
    sound.playTap();
  };

  const handleConfirm = () => {
    if (!selected) return;
    sound.playTreasure();
    onSelectAndStart(selected);
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-3xl w-full mx-auto p-4 sm:p-6 my-auto">
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-md">
        {/* Screen Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">
              Khung 04 · Chọn đạo cụ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Chọn Một Pháp Bảo Đồng Hành
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Mỗi tu sĩ chỉ được chọn duy nhất <b className="text-amber-300">một</b> pháp bảo trợ lực xuyên suốt 10 ải.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-2xl shrink-0">
            💎
          </div>
        </div>

        {/* 3 Treasure Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {treasures.map((t) => {
            const info = TREASURE_INFO[t];
            const isSelected = selected === t;

            return (
              <button
                key={t}
                type="button"
                onClick={() => handleSelect(t)}
                className={`text-left p-4 rounded-2xl border-2 transition-all flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400 shadow-xl shadow-amber-500/20 ring-2 ring-amber-400/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950/90'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl mb-3 shadow-inner">
                    {info.emoji}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-teal-400 mb-0.5">
                    {info.badge}
                  </div>
                  <h3 className="text-base font-black text-white mb-2">
                    {info.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {info.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span
                    className={`text-[11px] font-bold ${
                      isSelected ? 'text-amber-300' : 'text-slate-500 group-hover:text-slate-400'
                    }`}
                  >
                    {isSelected ? '✓ Đã chọn bảo vật' : 'Chạm để chọn'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playTap();
              onBack();
            }}
            className="flex-1 min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs sm:text-sm active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </button>

          <button
            type="button"
            disabled={!selected}
            onClick={handleConfirm}
            className={`flex-[2] min-h-[48px] px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
              selected
                ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            <span>Chốt pháp bảo & Vào ải</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
