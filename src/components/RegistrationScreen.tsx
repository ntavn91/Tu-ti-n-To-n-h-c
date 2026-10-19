import React, { useState } from 'react';
import { User, GraduationCap, ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/sound';

interface RegistrationScreenProps {
  initialName: string;
  initialClass: string;
  onConfirm: (name: string, className: string) => void;
  onBack: () => void;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  initialName,
  initialClass,
  onConfirm,
  onBack,
}) => {
  const [name, setName] = useState(initialName);
  const [className, setClassName] = useState(initialClass);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedClass = className.trim();

    if (!trimmedName || !trimmedClass) {
      sound.playWrong();
      setError('Vui lòng nhập đầy đủ Họ tên và Lớp học của tu sĩ!');
      return;
    }

    sound.playTap();
    onConfirm(trimmedName, trimmedClass);
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-xl w-full mx-auto p-4 sm:p-6 my-auto">
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">
              Khung 02 · Đăng ký danh tính
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Ghi danh vào Tu Tiên Giới
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Thông tin sẽ được khắc ghi trên Bảng Phong Thần cuối chặng đường.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-2xl shrink-0">
            📜
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/70 border border-rose-600/50 text-rose-300 text-xs font-semibold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Họ và tên Tu Sĩ
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                maxLength={50}
                placeholder="Ví dụ: Nguyễn Văn A"
                autoComplete="name"
                autoCapitalize="words"
                className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Lớp học
            </label>
            <div className="relative">
              <GraduationCap className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={className}
                onChange={(e) => {
                  setClassName(e.target.value);
                  if (error) setError('');
                }}
                maxLength={20}
                placeholder="Ví dụ: 8A1 hoặc 8/2"
                autoComplete="off"
                className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
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
              type="submit"
              className="flex-[2] min-h-[48px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-teal-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Xác nhận danh tính</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
