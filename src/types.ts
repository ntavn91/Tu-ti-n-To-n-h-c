export type TreasureType = 'jade' | 'time' | 'skip';

export interface QuestionData {
  n: number;
  tag: string;
  emoji: string;
  title: string;
  prompt: string;
  math: string;
  opts: string[];
  correct: string;
  correctIndex: number;
  explanation: string;
}

export interface UserAnswerRecord {
  n: number;
  choice: number;
  correct: boolean;
  skipped?: boolean;
  timeSpent?: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  className: string;
  treasure: TreasureType;
  score: number;
  correctCount: number;
  realm: string;
  date: string;
}

export type ScreenId = 
  | 'hero' 
  | 'register' 
  | 'rules' 
  | 'treasure' 
  | 'quiz' 
  | 'climax' 
  | 'result' 
  | 'closing' 
  | 'review';

export const REALMS: string[] = [
  "Luyện Khí",
  "Trúc Cơ",
  "Kết Đan",
  "Nguyên Anh",
  "Hóa Thần",
  "Luyện Hư",
  "Hợp Thể",
  "Đại Thừa",
  "Độ Kiếp",
  "Phi Thăng Tiên Giới"
];

export const REALM_COLORS: string[] = [
  "from-emerald-500 to-teal-700",
  "from-cyan-500 to-blue-600",
  "from-blue-500 to-indigo-600",
  "from-indigo-500 to-purple-600",
  "from-purple-500 to-fuchsia-600",
  "from-fuchsia-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-orange-500 to-red-600",
  "from-red-500 to-rose-700",
  "from-amber-300 via-yellow-400 to-amber-600"
];

export const TREASURE_INFO: Record<TreasureType, { name: string; emoji: string; desc: string; badge: string }> = {
  jade: {
    name: "Ngọc Như Ý",
    emoji: "🟢",
    desc: "Cứu sai 1 lần: Tự động kích hoạt khi sai lần đầu (câu 1–9), giúp bạn vẫn được +1 cảnh giới và tiếp tục hành trình.",
    badge: "Hộ Thể Kim Thân"
  },
  time: {
    name: "Pháp Tắc Thời Gian",
    emoji: "⌛",
    desc: "Tăng thời gian suy nghĩ cho tất cả 10 câu hỏi từ 20 giây lên 30 giây, giúp bình tĩnh tính toán từng bước.",
    badge: "Định Thời Thần Thông"
  },
  skip: {
    name: "Đại Diễn Quyết",
    emoji: "🔮",
    desc: "Chủ động bấm bỏ qua 1 câu hỏi bất kỳ (từ câu 1 đến 9) và tiến thẳng lên +1 cảnh giới mà không cần trả lời.",
    badge: "Bá Đạo Độn Thuật"
  }
};
