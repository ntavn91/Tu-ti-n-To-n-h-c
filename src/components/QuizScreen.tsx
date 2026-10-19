import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Zap, Shield, ArrowRight, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { QuestionData, TreasureType, REALMS, TREASURE_INFO } from '../types';
import { MathView } from './MathView';
import { sound } from '../utils/sound';

interface QuizScreenProps {
  question: QuestionData;
  stageIndex: number;
  totalStages: number;
  score: number;
  realmIndex: number;
  treasure: TreasureType;
  jadeUsed: boolean;
  skipUsed: boolean;
  onAnswer: (choiceIndex: number, isTimeout: boolean) => {
    isCorrect: boolean;
    jadeRescued: boolean;
    newRealmIndex: number;
    newScore: number;
  };
  onSkip: () => void;
  onNext: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  stageIndex,
  totalStages,
  score,
  realmIndex,
  treasure,
  jadeUsed,
  skipUsed,
  onAnswer,
  onSkip,
  onNext,
}) => {
  const isFinalStage = question.n === 10;
  const initialSeconds = treasure === 'time' ? 30 : 20;

  const [remainingTime, setRemainingTime] = useState<number>(initialSeconds);
  const [locked, setLocked] = useState<boolean>(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isCorrect: boolean;
    jadeRescued: boolean;
    message: string;
  }>({ show: false, isCorrect: false, jadeRescued: false, message: '' });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset state on new question
  useEffect(() => {
    setRemainingTime(initialSeconds);
    setLocked(false);
    setSelectedChoice(null);
    setFeedback({ show: false, isCorrect: false, jadeRescued: false, message: '' });

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleAnswerAction(-1, true);
          return 0;
        }
        if (prev <= 6) {
          sound.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [question.n]);

  const handleAnswerAction = (choiceIdx: number, isTimeout: boolean) => {
    if (locked) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setLocked(true);
    setSelectedChoice(choiceIdx);

    const result = onAnswer(choiceIdx, isTimeout);

    if (result.isCorrect) {
      sound.playCorrect();
      setFeedback({
        show: true,
        isCorrect: true,
        jadeRescued: false,
        message: `Chính xác! +10 tu vi. Thăng tiến lên cảnh giới [${REALMS[result.newRealmIndex]}].`
      });
    } else if (result.jadeRescued) {
      sound.playTreasure();
      setFeedback({
        show: true,
        isCorrect: false,
        jadeRescued: true,
        message: `🟢 Ngọc Như Ý phát sáng hộ thể! Dù câu trả lời chưa đúng, pháp bảo đã cứu mạng và độ bạn thăng cảnh giới lên [${REALMS[result.newRealmIndex]}]!`
      });
    } else {
      sound.playWrong();
      setFeedback({
        show: true,
        isCorrect: false,
        jadeRescued: false,
        message: isTimeout
          ? `Hết thời gian suy nghĩ! Cảnh giới hiện tại giữ nguyên [${REALMS[realmIndex]}].`
          : `Chưa chính xác. Cảnh giới hiện tại giữ nguyên [${REALMS[realmIndex]}].`
      });
    }
  };

  const handleSkipAction = () => {
    if (locked || isFinalStage || treasure !== 'skip' || skipUsed) return;
    if (timerRef.current) clearInterval(timerRef.current);
    sound.playTreasure();
    onSkip();
  };

  const optionLabels = ['A', 'B', 'C', 'D'];
  const progressPercent = Math.round((stageIndex / totalStages) * 100);

  return (
    <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto p-2 sm:p-5 my-auto">
      {/* Top Stage Bar */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{question.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-400">
                {isFinalStage ? "Khung 10 · Đại Trận Thiên Môn" : `Cửa ải 0${question.n}`}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-400/30">
                {question.tag}
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-white leading-tight">
              {question.title}
            </h2>
          </div>
        </div>

        {/* Countdown Timer Badge */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm transition-all ${
            remainingTime <= 5
              ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
              : 'bg-slate-900 border-slate-700 text-teal-300'
          }`}
        >
          <Clock className="w-4 h-4 shrink-0" />
          <span>{remainingTime}s</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-slate-900 border border-slate-800 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-500 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Mobile Quick Status Strip */}
      <div className="flex sm:hidden items-center justify-between bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 text-[11px] font-bold text-slate-300 mb-2">
        <div className="flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Tu vi: <b className="text-amber-300">{score}</b> pt</span>
        </div>
        <div className="flex items-center gap-1">
          <span>☯ <b className="text-teal-300">{REALMS[realmIndex]}</b></span>
        </div>
        <div className="flex items-center gap-1">
          <span>💎 <b className="text-purple-300">{TREASURE_INFO[treasure]?.name}</b></span>
        </div>
      </div>

      {/* Main Grid: Question Card + Side Stats Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 flex-1">
        {/* Left 3 cols: Question Card */}
        <div className="lg:col-span-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 flex flex-col justify-between shadow-2xl backdrop-blur-md">
          <div>
            {/* Prompt */}
            <div className="text-sm sm:text-base font-bold text-slate-200 mb-2">
              <MathView content={question.prompt} />
            </div>

            {/* Math Formula Display Box */}
            {question.math && question.math.trim() !== '' && (
              <div className="my-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0c1a30] border border-cyan-500/30 text-cyan-200 shadow-inner overflow-x-auto text-center">
                <MathView content={question.math} displayMode={true} />
              </div>
            )}

            {/* Answer Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-3">
              {question.opts.map((opt, idx) => {
                const isSelected = selectedChoice === idx;
                const isCorrect = idx === question.correctIndex;
                let btnStyle = "bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-600 hover:bg-slate-950/90";

                if (locked) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/20";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg shadow-rose-500/20";
                  } else {
                    btnStyle = "bg-slate-950/40 border-slate-900 text-slate-500 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={locked}
                    onClick={() => handleAnswerAction(idx, false)}
                    className={`min-h-[52px] p-3 rounded-xl sm:rounded-2xl border-2 text-left flex items-center gap-3 transition-all active:scale-[0.98] ${btnStyle}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                        locked && isCorrect
                          ? 'bg-emerald-500 text-slate-950'
                          : locked && isSelected
                          ? 'bg-rose-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {optionLabels[idx]}
                    </span>
                    <div className="flex-1 font-semibold text-xs sm:text-sm overflow-x-auto">
                      <MathView content={opt} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback Alert */}
            <AnimatePresence>
              {feedback.show && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-3 p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-start gap-2.5 ${
                    feedback.isCorrect
                      ? 'bg-emerald-950/70 border-emerald-600/60 text-emerald-300'
                      : feedback.jadeRescued
                      ? 'bg-teal-950/70 border-teal-500/60 text-teal-300 shadow-md shadow-teal-500/20'
                      : 'bg-rose-950/70 border-rose-600/60 text-rose-300'
                  }`}
                >
                  {feedback.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : feedback.jadeRescued ? (
                    <Sparkles className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 leading-relaxed">
                    {feedback.message}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Row / Bottom Thumb Zone */}
          <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800">
            {/* Skip Button (Đại Diễn Quyết) */}
            {treasure === 'skip' && !skipUsed && !isFinalStage && !locked ? (
              <button
                type="button"
                onClick={handleSkipAction}
                className="min-h-[46px] px-3.5 py-2 rounded-xl bg-purple-950/80 border border-purple-500 text-purple-200 font-bold text-xs hover:bg-purple-900 active:scale-95 transition-all flex items-center gap-1.5 shadow-md shadow-purple-500/20"
              >
                <span>🔮</span>
                <span>Dùng Đại Diễn Quyết</span>
              </button>
            ) : (
              <div className="text-[11px] text-slate-500 hidden sm:block">
                {locked ? "Đã khóa đáp án" : "Chọn đáp án để ghi nhận"}
              </div>
            )}

            {/* Next Button */}
            {locked && (
              <button
                type="button"
                onClick={() => {
                  sound.playTap();
                  onNext();
                }}
                className="ml-auto min-h-[46px] px-6 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-black text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 shadow-lg shadow-teal-500/25"
              >
                <span>{isFinalStage ? "Hoàn tất Độ Kiếp" : "Cửa ải tiếp theo"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right 1 col: Cultivator Status (Desktop / Tablet view) */}
        <div className="hidden lg:flex flex-col gap-3">
          {/* Tu vi stat card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Tu vi tích lũy
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-black text-amber-400 tabular-nums">
                {score}
              </span>
              <span className="text-xs text-slate-400">pt</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Mỗi ải thành công +10 điểm</p>
          </div>

          {/* Cảnh giới stat card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-400">
              Cảnh giới hiện tại
            </span>
            <div className="text-lg font-black text-white mt-1">
              {REALMS[realmIndex]}
            </div>
            <div className="text-xs font-semibold text-purple-300 mt-0.5">
              Bậc {realmIndex + 1} / 10
            </div>
          </div>

          {/* Pháp bảo stat card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-400">
              Pháp bảo đồng hành
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl">{TREASURE_INFO[treasure]?.emoji}</span>
              <div className="font-bold text-xs text-white">
                {TREASURE_INFO[treasure]?.name}
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 leading-tight">
              {isFinalStage
                ? "🔒 Phong ấn ở cửa ải số 10"
                : treasure === 'jade'
                ? jadeUsed
                  ? "Đã phát huy tác dụng"
                  : "Sẵn sàng cứu mạng"
                : treasure === 'skip'
                ? skipUsed
                  ? "Đã dùng đao pháp"
                  : "Sẵn sàng bỏ qua 1 ải"
                : "Tác dụng: 30s/câu"}
            </p>
          </div>

          {/* Cultivation Mascot Box */}
          <div className="flex-1 min-h-[100px] bg-gradient-to-br from-teal-950/40 via-indigo-950/40 to-slate-950 rounded-2xl border border-slate-800/80 flex flex-col items-center justify-center p-3 text-center">
            <span className="text-4xl mb-1 select-none">🧙🏻‍♂️</span>
            <span className="text-[11px] font-bold text-teal-300">
              "Tâm tĩnh như nước, trí sáng như gương!"
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
