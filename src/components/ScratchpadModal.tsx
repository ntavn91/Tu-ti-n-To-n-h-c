import React, { useRef, useState, useEffect } from 'react';
import { X, RotateCcw, PenTool, Eraser } from 'lucide-react';
import { sound } from '../utils/sound';

interface ScratchpadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScratchpadModal: React.FC<ScratchpadModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#57d7d0');
  const [isEraser, setIsEraser] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to match display size with high DPI
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3;

    // Save initial blank state
    const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialData]);
  }, [isOpen]);

  if (!isOpen) return null;

  const startDraw = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (clientX: number, clientY: number) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.strokeStyle = isEraser ? '#0f2038' : color;
    ctx.lineWidth = isEraser ? 18 : 3;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev.slice(-15), currentData]);
  };

  const clearCanvas = () => {
    sound.playTap();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const blank = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([blank]);
  };

  const undo = () => {
    sound.playTap();
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nextHistory = history.slice(0, -1);
    const prevData = nextHistory[nextHistory.length - 1];
    ctx.putImageData(prevData, 0, 0);
    setHistory(nextHistory);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/85 backdrop-blur-md p-3 sm:p-5">
      {/* Scratchpad Header */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-2.5 mb-2 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-xl">✍️</span>
          <div>
            <h3 className="text-sm font-bold text-amber-300">Bảng Nháp Linh Lực</h3>
            <p className="text-[11px] text-slate-400">Vẽ ngón tay nháp công thức & hình học</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={undo}
            title="Hoàn tác"
            className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-xl active:scale-95 transition-transform"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={clearCanvas}
            title="Xóa bảng"
            className="px-2.5 py-1 text-xs font-semibold text-rose-300 hover:text-rose-200 bg-rose-950/60 border border-rose-800/40 rounded-xl active:scale-95 transition-transform"
          >
            Xóa hết
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Đóng bảng nháp"
            className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-xl active:scale-95 transition-transform"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative flex-1 bg-[#0f2038] border-2 border-teal-500/40 rounded-2xl overflow-hidden shadow-2xl touch-none">
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #57d7d0 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseDown={(e) => startDraw(e.clientX, e.clientY)}
          onMouseMove={(e) => draw(e.clientX, e.clientY)}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={(e) => {
            if (e.touches[0]) startDraw(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchMove={(e) => {
            if (e.touches[0]) draw(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchEnd={stopDraw}
        />
      </div>

      {/* Tools Footer */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-2 mt-2 shadow-xl">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setIsEraser(false); sound.playTap(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              !isEraser ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20' : 'bg-slate-800 text-slate-300'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            Bút
          </button>
          <button
            type="button"
            onClick={() => { setIsEraser(true); sound.playTap(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isEraser ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20' : 'bg-slate-800 text-slate-300'
            }`}
          >
            <Eraser className="w-3.5 h-3.5" />
            Tẩy
          </button>
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-2">
          {['#57d7d0', '#ffd36a', '#ffffff', '#f43f5e'].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => { setColor(c); setIsEraser(false); sound.playTap(); }}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${
                color === c && !isEraser ? 'scale-125 border-white ring-2 ring-teal-400' : 'border-transparent opacity-80'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
