import React from 'react';
import { Volume2, VolumeX, Edit3 } from 'lucide-react';
import { REALMS } from '../types';

interface TopBarProps {
  playerName: string;
  realmIndex: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenScratchpad?: () => void;
  showScratchpadBtn?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  playerName,
  realmIndex,
  soundEnabled,
  onToggleSound,
  onOpenScratchpad,
  showScratchpadBtn = false,
}) => {
  const currentRealm = REALMS[Math.min(realmIndex, REALMS.length - 1)];

  return (
    <header className="h-14 shrink-0 bg-[#0c1a30]/95 backdrop-blur-md border-b-2 border-amber-400/80 px-3 sm:px-6 flex items-center justify-between gap-2 z-20 shadow-lg">
      {/* Brand */}
      <div className="flex items-center gap-2 select-none min-w-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-200 text-[#0c1a30] font-black grid place-items-center text-lg shadow-sm shrink-0">
          ☯
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-extrabold text-sm sm:text-base tracking-wide text-white truncate font-outfit uppercase">
            Tu Tiên Toán Học
          </span>
          <span className="text-[10px] text-teal-300/80 truncate hidden sm:block">
            Đại Năng Nguyễn Tuấn Anh
          </span>
        </div>
      </div>

      {/* Right Controls & Info */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Scratchpad Trigger for Mobile & Desktop */}
        {showScratchpadBtn && onOpenScratchpad && (
          <button
            type="button"
            onClick={onOpenScratchpad}
            title="Mở Bảng Nháp Tính Toán"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-semibold hover:bg-teal-500/25 active:scale-95 transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline text-[11px]">Bảng Nháp</span>
          </button>
        )}

        {/* Cultivator & Realm Badges */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white font-bold truncate max-w-[110px] sm:max-w-[140px] text-[11px]">
            {playerName ? playerName : "Tu sĩ mới"}
          </div>

          <div className="hidden sm:flex items-center px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 font-bold text-[11px] whitespace-nowrap">
            {currentRealm}
          </div>
        </div>

        {/* Audio Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
          className="w-8 h-8 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center active:scale-95 transition-transform"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-teal-300" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500" />
          )}
        </button>
      </div>
    </header>
  );
};
