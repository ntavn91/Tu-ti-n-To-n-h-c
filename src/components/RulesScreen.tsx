import React from 'react';
import { Target, Zap, Compass, CloudLightning, ArrowLeft, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface RulesScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export const RulesScreen: React.FC<RulesScreenProps> = ({ onNext, onBack }) => {
  return (
    <div className="flex-1 flex flex-col justify-center max-w-2xl w-full mx-auto p-4 sm:p-6 my-auto">
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-md">
        {/* Screen Heading */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">
              Khung 03 · Nhập môn
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Nắm Vững Thần Thông Quy Luật
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Muốn vượt qua 10 cửa ải, trước hết cần thông thấu quy tắc tu đạo.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-400/20 border border-teal-400/30 flex items-center justify-center text-2xl shrink-0">
            📚
          </div>
        </div>

        {/* 4 Rules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-teal-500/15 text-teal-300 shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                10 Cửa Ải Toán Học
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Mỗi câu đúng giúp tăng <b className="text-teal-300">+1 Cảnh giới</b>. Trả lời sai không bị tụt bậc cảnh giới đã đạt.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-300 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Tích Lũy Tu Vi
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Mỗi câu trả lời đúng cộng <b className="text-amber-300">10 điểm tu vi</b>. Thời gian mặc định mỗi câu là 20 giây.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-300 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Tam Đại Pháp Bảo
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Tu sĩ được chọn duy nhất <b className="text-purple-300">1 pháp bảo hộ thân</b> hỗ trợ vượt ải xuyên suốt trò chơi.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-500/15 text-rose-300 shrink-0">
              <CloudLightning className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Thiên Môn Thử Thách
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Cửa ải 10 là độ kiếp quyết định, <b className="text-rose-300">khóa bảo vật trợ lực</b> để thử thách thực lực đỉnh cao.
              </p>
            </div>
          </div>
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
            onClick={() => {
              sound.playTap();
              onNext();
            }}
            className="flex-[2] min-h-[48px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-teal-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Tìm kiếm pháp bảo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
