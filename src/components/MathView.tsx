import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  content: string;
  className?: string;
  displayMode?: boolean;
}

export const MathView: React.FC<MathViewProps> = ({ content, className = '', displayMode = false }) => {
  const renderedHtml = useMemo(() => {
    if (!content) return '';
    const trimmed = content.trim();

    // 1. Pure display math: $$...$$
    if (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length >= 4) {
      const mathStr = trimmed.slice(2, -2).trim();
      try {
        return `<div class="my-1 overflow-x-auto text-center">${katex.renderToString(mathStr, {
          displayMode: true,
          throwOnError: false,
        })}</div>`;
      } catch {
        return content;
      }
    }

    // 2. Pure single inline math: $...$
    if (trimmed.startsWith('$') && trimmed.endsWith('$') && trimmed.length >= 2 && !trimmed.slice(1, -1).includes('$')) {
      const mathStr = trimmed.slice(1, -1).trim();
      try {
        return `<span class="inline-block px-0.5 align-middle">${katex.renderToString(mathStr, {
          displayMode: displayMode,
          throwOnError: false,
        })}</span>`;
      } catch {
        return content;
      }
    }

    // 3. Mixed content containing $...$ or $$...$$
    if (content.includes('$')) {
      let processed = content;

      // First replace display math $$...$$
      processed = processed.replace(/\$\$(.+?)\$\$/gs, (_, math) => {
        try {
          return `<div class="my-1.5 overflow-x-auto text-center">${katex.renderToString(math.trim(), {
            displayMode: true,
            throwOnError: false,
          })}</div>`;
        } catch {
          return `$$${math}$$`;
        }
      });

      // Next replace inline math $...$
      processed = processed.replace(/\$(.+?)\$/g, (_, math) => {
        try {
          return `<span class="inline-block px-0.5 align-middle">${katex.renderToString(math.trim(), {
            displayMode: false,
            throwOnError: false,
          })}</span>`;
        } catch {
          return `$${math}$`;
        }
      });

      // Preserve line breaks
      processed = processed.replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>');
      return processed;
    }

    // 4. Content without $ delimiters:
    // Check if it contains LaTeX keywords or algebraic notation (e.g. ^, _, \text, \frac, \circ)
    const hasLatexNotation = /\\text|\\frac|\\circ|\\widehat|\\triangle|\^|_|\\cdot|\\dots|\\pm|\\quad/.test(trimmed);

    if (hasLatexNotation || displayMode) {
      try {
        return `<span class="inline-block px-0.5 align-middle">${katex.renderToString(trimmed, {
          displayMode: displayMode,
          throwOnError: false,
        })}</span>`;
      } catch {
        // Fallback to text with line breaks
      }
    }

    // 5. Plain text fallback with linebreaks
    return content.replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>');
  }, [content, displayMode]);

  return (
    <div
      className={`leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};
