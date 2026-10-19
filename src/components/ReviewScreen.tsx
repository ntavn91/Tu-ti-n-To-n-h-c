import React from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, BookOpen } from 'lucide-react';
import { QuestionData, UserAnswerRecord } from '../types';
import { MathView } from './MathView';
import { sound } from '../utils/sound';

interface ReviewScreenProps {
  questions: QuestionData[];
  answers: UserAnswerRecord[];
  onBackToResult: () => void;
  onProceedToClosing: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  questions,
  answers,
  onBackToResult,
  onProceedToClosing,
}) => {
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">
            Học từ thử thách
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
            Ôn Tập & Lời Giải Chi Tiết
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Đối chiếu đáp án và xem phương pháp giải từng cửa ải.
          </p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-xl shrink-0">
          📖
        </div>
      </div>

      {/* Questions Review List */}
      <div className="space-y-4 mb-6">
        {questions.map((q, idx) => {
          const ans = answers[idx];
          const isCorrect = ans?.correct;
          const isSkipped = ans?.skipped;
          const userChoiceText = ans && ans.choice >= 0 ? q.opts[ans.choice] : 'Hết giờ / Không chọn';

          return (
            <div
              key={q.n}
              className={`p-4 sm:p-5 rounded-2xl border bg-slate-900/90 shadow-lg ${
                isCorrect
                  ? 'border-emerald-600/50'
                  : isSkipped
                  ? 'border-purple-500/50'
                  : 'border-rose-600/50'
              }`}
            >
              {/* Question Top Badge */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{q.emoji}</span>
                  <span className="text-xs font-black text-white">
                    CÂU {q.n} · {q.tag}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold">
                  {isCorrect ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Chính xác
                    </span>
                  ) : isSkipped ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Đại Diễn Quyết
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      Chưa đúng
                    </span>
                  )}
                </div>
              </div>

              {/* Prompt */}
              <div className="text-sm font-semibold text-slate-200 mb-2">
                <MathView content={q.prompt} />
              </div>

              {/* Math Display if any */}
              {q.math && q.math.trim() !== '' && (
                <div className="my-2 p-2.5 rounded-xl bg-[#0c1a30] border border-cyan-500/20 text-cyan-200 text-center overflow-x-auto">
                  <MathView content={q.math} displayMode={true} />
                </div>
              )}

              {/* Answer comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Lựa chọn của bạn:</span>
                  <div className={`font-bold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {ans && ans.choice >= 0 && (
                      <span className="mr-1 inline-block w-4 h-4 text-center rounded bg-slate-800 text-[10px]">
                        {optionLabels[ans.choice]}
                      </span>
                    )}
                    <MathView content={userChoiceText} />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-emerald-900/60">
                  <span className="text-emerald-400 block mb-0.5 font-bold">Đáp án đúng chuẩn:</span>
                  <div className="font-bold text-emerald-300">
                    <span className="mr-1 inline-block w-4 h-4 text-center rounded bg-emerald-900/70 text-[10px]">
                      {optionLabels[q.correctIndex]}
                    </span>
                    <MathView content={q.correct} />
                  </div>
                </div>
              </div>

              {/* Explanation */}
              {q.explanation && (
                <div className="mt-3 p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-slate-300">
                  <div className="flex items-center gap-1 text-indigo-300 font-bold mb-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Phương pháp & Lời giải chi tiết:</span>
                  </div>
                  <MathView content={q.explanation} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-3 sticky bottom-2 bg-slate-950/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800">
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onBackToResult();
          }}
          className="flex-1 min-h-[46px] px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs sm:text-sm active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về Bảng Phong Thần</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onProceedToClosing();
          }}
          className="flex-1 min-h-[46px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-teal-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <span>Hoàn thành</span>
          <span>➜</span>
        </button>
      </div>
    </div>
  );
};
