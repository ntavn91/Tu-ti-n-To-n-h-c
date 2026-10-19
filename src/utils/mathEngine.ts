import { QuestionData } from '../types';

function rand(a: number, b: number): number {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function pick<T>(arr: T[]): T {
  return arr[rand(0, arr.length - 1)];
}

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function makeUniqueOptions(correct: string, distractors: string[]): string[] {
  const list = [correct];
  for (const item of distractors) {
    if (item && !list.includes(item)) {
      list.push(item);
    }
  }
  return shuffle(list.slice(0, 4));
}

export function generateQuestion(stage: number): QuestionData {
  switch (stage) {
    case 1: {
      // Đơn thức: Bậc & Hệ số
      const x = rand(1, 4);
      const y = rand(1, 4);
      const z = rand(1, 3);
      const c = pick([-12, -9, -8, -7, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8, 9, 12]);
      const deg = x + y + z;
      const prompt = "Xác định bậc và hệ số của đơn thức sau:";
      const math = `$$A = ${c}x^{${x}}y^{${y}}z^{${z}}$$`;
      const correct = `\\text{Bậc } ${deg}; \\text{ hệ số } ${c}`;
      const opts = makeUniqueOptions(correct, [
        `\\text{Bậc } ${deg + 1}; \\text{ hệ số } ${c}`,
        `\\text{Bậc } ${deg}; \\text{ hệ số } ${-c}`,
        `\\text{Bậc } ${deg - 1}; \\text{ hệ số } ${c}`,
        `\\text{Bậc } ${deg}; \\text{ hệ số } ${c > 0 ? c * 2 : Math.floor(c / 2)}`
      ]);
      const explanation = `• Bậc của đơn thức có hệ số khác 0 là tổng số mũ của tất cả các biến: $${x} + ${y} + ${z} = ${deg}$.\\n• Hệ số là phần số đứng trước các biến: $${c}$.`;

      return {
        n: 1,
        tag: "Đơn thức",
        emoji: "🔹",
        title: "Khai Sơn Phá Thạch",
        prompt,
        math,
        opts,
        correct,
        correctIndex: opts.indexOf(correct),
        explanation
      };
    }

    case 2: {
      // Đa thức: Bậc của đa thức sau thu gọn
      const a = rand(2, 6);
      const p = rand(2, 3);
      const qP = rand(2, 3);
      const trueDeg = p + qP;
      const cancelPow = trueDeg + rand(1, 2);
      const subCoef = rand(2, 7);
      const prompt = "Tìm bậc của đa thức sau (lưu ý rút gọn trước khi xác định):";
      const math = `$$P = ${a}x^{${cancelPow}}y - ${subCoef}x^{${p}}y^{${qP}} + 3xy - ${a}x^{${cancelPow}}y + 9$$`;
      const correct = `\\text{Bậc } ${trueDeg}`;
      const opts = makeUniqueOptions(correct, [
        `\\text{Bậc } ${cancelPow + 1}`,
        `\\text{Bậc } ${trueDeg + 1}`,
        `\\text{Bậc } ${trueDeg - 1}`,
        `\\text{Bậc } ${cancelPow}`
      ]);
      const explanation = `• Thu gọn đa thức: Hạng tử $${a}x^{${cancelPow}}y$ và $-${a}x^{${cancelPow}}y$ đối nhau triệt tiêu.\\n• Biểu thức còn lại: $P = -${subCoef}x^{${p}}y^{${qP}} + 3xy + 9$.\\n• Bậc cao nhất là của hạng tử $-${subCoef}x^{${p}}y^{${qP}}$ có số mũ là $${p} + ${qP} = ${trueDeg}$.`;

      return {
        n: 2,
        tag: "Đa thức",
        emoji: "📘",
        title: "Hóa Giải Đa Thức",
        prompt,
        math,
        opts,
        correct,
        correctIndex: opts.indexOf(correct),
        explanation
      };
    }

    case 3: {
      // Cộng - Trừ đa thức
      const a = rand(2, 5);
      const b = rand(2, 5);
      const c = rand(1, 4);
      const d = rand(1, 4);
      const e = rand(1, 5);
      const sX2 = a + c;
      const sXY = b - d;
      const xyText = sXY === 0 ? "" : (sXY > 0 ? ` + ${sXY}xy` : ` - ${Math.abs(sXY)}xy`);
      const prompt = "Tính tổng hai đa thức $A + B$ biết:";
      const math = `$$A = ${a}x^2 + ${b}xy, \\quad B = ${c}x^2 - ${d}xy + ${e}y^2$$`;
      const correct = `${sX2}x^2${xyText} + ${e}y^2`;
      const opts = makeUniqueOptions(correct, [
        `${sX2 + 1}x^2${xyText} + ${e}y^2`,
        `${sX2}x^2 + ${b + d}xy + ${e}y^2`,
        `${sX2}x^2${xyText} - ${e}y^2`,
        `${sX2}x^2 + ${e}y^2`
      ]);
      const explanation = `• Nhóm các hạng tử đồng dạng:\\n$A + B = (${a}x^2 + ${c}x^2) + (${b}xy - ${d}xy) + ${e}y^2 = ${sX2}x^2${xyText} + ${e}y^2$.`;

      return {
        n: 3,
        tag: "Cộng Trừ Đa Thức",
        emoji: "➕",
        title: "Dung Hợp Linh Lực",
        prompt,
        math,
        opts,
        correct,
        correctIndex: opts.indexOf(correct),
        explanation
      };
    }

    case 4: {
      // Hằng đẳng thức đáng nhớ
      const type = rand(1, 3);
      const a = rand(1, 3);
      const b = rand(2, 4);
      const aS = a === 1 ? "" : a.toString();
      const bS = b === 1 ? "" : b.toString();
      const a2 = a * a;
      const b2 = b * b;
      const ab2 = 2 * a * b;

      if (type === 1) {
        const prompt = "Khai triển hằng đẳng thức bình phương của một tổng:";
        const math = `$$(${aS}x + ${bS}y)^2$$`;
        const correct = `${a2 === 1 ? "" : a2}x^2 + ${ab2}xy + ${b2}y^2`;
        const opts = makeUniqueOptions(correct, [
          `${a2 === 1 ? "" : a2}x^2 + ${a * b}xy + ${b2}y^2`,
          `${a2 === 1 ? "" : a2}x^2 + ${ab2}xy + ${b * 2}y^2`,
          `${a2 === 1 ? "" : a2}x^2 - ${ab2}xy + ${b2}y^2`,
          `${a2 === 1 ? "" : a2}x^2 + ${b2}y^2`
        ]);
        const explanation = `Áp dụng hằng đẳng thức $(A + B)^2 = A^2 + 2AB + B^2$:\\n$(${aS}x + ${bS}y)^2 = (${aS}x)^2 + 2(${aS}x)(${bS}y) + (${bS}y)^2 = ${a2 === 1 ? "" : a2}x^2 + ${ab2}xy + ${b2}y^2$.`;
        return { n: 4, tag: "Hằng đẳng thức", emoji: "✨", title: "Thần Cơ Diệu Toán", prompt, math, opts, correct, correctIndex: opts.indexOf(correct), explanation };
      } else if (type === 2) {
        const prompt = "Khai triển hằng đẳng thức bình phương của một hiệu:";
        const math = `$$(${aS}x - ${bS}y)^2$$`;
        const correct = `${a2 === 1 ? "" : a2}x^2 - ${ab2}xy + ${b2}y^2`;
        const opts = makeUniqueOptions(correct, [
          `${a2 === 1 ? "" : a2}x^2 - ${a * b}xy + ${b2}y^2`,
          `${a2 === 1 ? "" : a2}x^2 + ${ab2}xy + ${b2}y^2`,
          `${a2 === 1 ? "" : a2}x^2 - ${ab2}xy - ${b2}y^2`,
          `${a2 === 1 ? "" : a2}x^2 - ${b2}y^2`
        ]);
        const explanation = `Áp dụng hằng đẳng thức $(A - B)^2 = A^2 - 2AB + B^2$:\\n$(${aS}x - ${bS}y)^2 = (${aS}x)^2 - 2(${aS}x)(${bS}y) + (${bS}y)^2 = ${a2 === 1 ? "" : a2}x^2 - ${ab2}xy + ${b2}y^2$.`;
        return { n: 4, tag: "Hằng đẳng thức", emoji: "✨", title: "Thần Cơ Diệu Toán", prompt, math, opts, correct, correctIndex: opts.indexOf(correct), explanation };
      } else {
        const prompt = "Phân tích đa thức thành nhân tử theo hằng đẳng thức hiệu hai bình phương:";
        const math = `$$${a2 === 1 ? "" : a2}x^2 - ${b2}y^2$$`;
        const correct = `(${aS}x - ${bS}y)(${aS}x + ${bS}y)`;
        const opts = makeUniqueOptions(correct, [
          `(${aS}x - ${bS}y)^2`,
          `(${aS}x + ${bS}y)^2`,
          `(${a2}x - ${b2}y)(${a2}x + ${b2}y)`,
          `(${aS}x - ${bS}y)`
        ]);
        const explanation = `Áp dụng hằng đẳng thức $A^2 - B^2 = (A - B)(A + B)$:\\n$${a2 === 1 ? "" : a2}x^2 - ${b2}y^2 = (${aS}x)^2 - (${bS}y)^2 = (${aS}x - ${bS}y)(${aS}x + ${bS}y)$.`;
        return { n: 4, tag: "Hằng đẳng thức", emoji: "✨", title: "Thần Cơ Diệu Toán", prompt, math, opts, correct, correctIndex: opts.indexOf(correct), explanation };
      }
    }

    case 5: {
      // Giá trị biểu thức
      const xV = pick([-3, -2, 2, 3]);
      const yV = pick([-2, -1, 1, 2]);
      const c1 = rand(1, 3);
      const c2 = rand(1, 3);
      const val = c1 * (xV * xV) * yV - c2 * xV * (yV * yV);
      const prompt = `Tính giá trị của biểu thức $Q$ tại $x = ${xV}, y = ${yV}$:`;
      const math = `$$Q = ${c1 === 1 ? "" : c1}x^2y - ${c2 === 1 ? "" : c2}xy^2$$`;
      const correct = `${val}`;
      const opts = makeUniqueOptions(correct, [
        `${val + rand(2, 5)}`,
        `${val - rand(2, 5)}`,
        `${-val}`,
        `${val + 1}`
      ]);
      const explanation = `Thay $x = ${xV}$ và $y = ${yV}$ vào biểu thức:\\n$Q = ${c1} \\cdot (${xV})^2 \\cdot (${yV}) - ${c2} \\cdot (${xV}) \\cdot (${yV})^2 = ${c1} \\cdot ${xV * xV} \\cdot (${yV}) - ${c2} \\cdot (${xV}) \\cdot ${yV * yV} = ${c1 * xV * xV * yV} - (${c2 * xV * yV * yV}) = ${val}$.`;

      return {
        n: 5,
        tag: "Giá trị biểu thức",
        emoji: "🧮",
        title: "Ngũ Hành Suy Tính",
        prompt,
        math,
        opts,
        correct,
        correctIndex: opts.indexOf(correct),
        explanation
      };
    }

    case 6: {
      // Hình bình hành
      const degA = pick([40, 50, 55, 60, 65, 70, 75, 80, 85]);
      const degB = 180 - degA;
      const prompt = `Cho hình bình hành $ABCD$ có góc $\\widehat{A} = ${degA}^\\circ$. Tính số đo góc $\\widehat{B}$ kề với góc $\\widehat{A}$:`;
      const math = `$$\\widehat{A} = ${degA}^\\circ, \\quad AB // CD, \\quad AD // BC$$`;
      const correct = `${degB}^\\circ`;
      const opts = makeUniqueOptions(correct, [
        `${degA}^\\circ`,
        `${180 - Math.floor(degB / 2)}^\\circ`,
        `90^\\circ`,
        `${degB - 10}^\\circ`
      ]);
      const explanation = `Trong hình bình hành, hai góc kề một cạnh bù nhau (tổng bằng $180^\\circ$ vì là hai góc trong cùng phía của hai đường thẳng song song).\\nDo đó: $\\widehat{B} = 180^\\circ - \\widehat{A} = 180^\\circ - ${degA}^\\circ = ${degB}^\\circ$.`;

      return {
        n: 6,
        tag: "Hình bình hành",
        emoji: "🔷",
        title: "Bát Quái Càn Khôn",
        prompt,
        math,
        opts,
        correct,
        correctIndex: opts.indexOf(correct),
        explanation
      };
    }

    case 7: {
      // Định lý Thales
      const am = rand(2, 5);
      const mult = rand(2, 4);
      const an = rand(3, 6);
      const mb = am * mult;
      const nc = an * mult;
      const prompt = `Cho $\\triangle ABC$, lấy $M \\in AB$ và $N \\in AC$ sao cho $MN // BC$. Biết $AM = ${am}\\text{ cm}$, $MB = ${mb}\\text{ cm}$, $AN = ${an}\\text{ cm}$. Tính độ dài đoạn thẳng $NC$:`;
      const math = `$$\\frac{AM}{MB} = \\frac{AN}{NC} \\quad (MN // BC)$$`;
      const correct = `${nc}\\text{ cm}`;
      const opts = makeUniqueOptions(correct, [
        `${nc + mult}\\text{ cm}`,
        `${Math.max(1, nc - mult)}\\text{ cm}`,
        `${an + mb}\\text{ cm}`,
        `${nc * 2}\\text{ cm}`
      ]);
      const explanation = `Theo định lý Thales trong $\\triangle ABC$ có $MN // BC$:\\n$$\\frac{AM}{MB} = \\frac{AN}{NC} \\implies NC = \\frac{MB \\cdot AN}{AM} = \\frac{${mb} \\cdot ${an}}{${am}} = ${nc}\\text{ cm}.$$`;

      return {
        n: 7,
        tag: "Định lý Thales",
        emoji: "📐",
        title: "Thước Tấc Thần Thông",
        prompt,
        math,
        opts,
        correct,
        correctIndex: opts.indexOf(correct),
        explanation
      };
    }

    case 8: {
      // Đường trung bình tam giác
      const mn = rand(4, 16);
      const bc = mn * 2;
      const prompt = `Cho $\\triangle ABC$, gọi $M, N$ lần lượt là trung điểm của $AB$ và $AC$. Biết độ dài đoạn $MN = ${mn}\\text{ cm}$. Tính độ dài cạnh đáy $BC$:`;
      const math = `$$MN \\text{ là đường trung bình của } \\triangle ABC, \\quad MN = ${mn}\\text{ cm}$$`;
      const correct = `${bc}\\text{ cm}`;
      const opts = makeUniqueOptions(correct, [
        `${mn}\\text{ cm}`,
        `${Math.floor(mn / 2)}\\text{ cm}`,
        `${bc + 4}\\text{ cm}`,
        `${bc - 3}\\text{ cm}`
      ]);
      const explanation = `Vì $M, N$ lần lượt là trung điểm của $AB, AC$ nên $MN$ là đường trung bình của $\\triangle ABC$.\\nTính chất đường trung bình: $MN = \\frac{1}{2} BC \\implies BC = 2 \\cdot MN = 2 \\cdot ${mn} = ${bc}\\text{ cm}$.`;

      return {
        n: 8,
        tag: "Đường trung bình",
        emoji: "📏",
        title: "Cân Bằng Thiên Địa",
        prompt,
        math,
        opts,
        correct,
        correctIndex: opts.indexOf(correct),
        explanation
      };
    }

    case 9: {
      // Hình vuông: Chu vi & Diện tích
      const aVal = rand(4, 12);
      const cVal = aVal * 4;
      const sVal = aVal * aVal;
      const prompt = `Một mảnh đất hình vuông có chu vi $C = ${cVal}\\text{ cm}$. Hãy tính diện tích $S$ của hình vuông đó:`;
      const math = `$$C = 4a = ${cVal}\\text{ cm} \\implies S = a^2 = ?$$`;
      const correct = `${sVal}\\text{ cm}^2`;
      const opts = makeUniqueOptions(correct, [
        `${cVal}\\text{ cm}^2`,
        `${Math.floor(sVal / 2)}\\text{ cm}^2`,
        `${cVal * 2}\\text{ cm}^2`,
        `${sVal + aVal}\\text{ cm}^2`
      ]);
      const explanation = `• Độ dài cạnh hình vuông: $a = \\frac{C}{4} = \\frac{${cVal}}{4} = ${aVal}\\text{ cm}$.\\n• Diện tích hình vuông: $S = a^2 = ${aVal}^2 = ${sVal}\\text{ cm}^2$.`;

      return {
        n: 9,
        tag: "Hình vuông",
        emoji: "🟦",
        title: "Cửu Cung Trận Pháp",
        prompt,
        math,
        opts,
        correct,
        correctIndex: opts.indexOf(correct),
        explanation
      };
    }

    case 10:
    default: {
      // Độ kiếp · Thử thách Thiên Môn
      const year = pick([2024, 2026, 2028, 2030]);
      const prompt = `Tính giá trị của biểu thức $P$ với số mũ chẵn lớn đối xứng:`;
      const math = `$$P = xyz + x^2y^2z^2 + x^3y^3z^3 + \\dots + x^{${year}}y^{${year}}z^{${year}}$$
Biết rằng: $x = 1, \\quad y = 1, \\quad z = -1$.`;
      const correct = `0`;
      const opts = makeUniqueOptions(correct, [
        `1`,
        `-1`,
        `${year}`,
        `2`
      ]);
      const explanation = `• Ta có: $xyz = 1 \\cdot 1 \\cdot (-1) = -1$.\\n• Do đó các số hạng: $(xyz)^k = (-1)^k$.\\n• Biểu thức trở thành:\\n$P = (-1)^1 + (-1)^2 + (-1)^3 + (-1)^4 + \\dots + (-1)^{${year}}$.\\n• Đây là tổng của $${year}$ số hạng (số chẵn), cứ mỗi cặp liên tiếp $(-1) + (+1) = 0$.\\n• Số cặp là $${year} / 2$, do đó tổng $P = 0$.`;

      return {
        n: 10,
        tag: "Độ Kiếp Thiên Môn",
        emoji: "🌩️",
        title: "Thiên Kiếp Quy Nguyên",
        prompt,
        math,
        opts,
        correct,
        correctIndex: opts.indexOf(correct),
        explanation
      };
    }
  }
}
