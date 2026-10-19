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

    // If pure display math wrapped in $$
    const trimmed = content.trim();
    if (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length >= 4) {
      const mathStr = trimmed.slice(2, -2).trim();
      try {
        return katex.renderToString(mathStr, {
          displayMode: true,
          throwOnError: false,
        });
      } catch {
        return content;
      }
    }

    // Split text by $$...$$ and $...$
    // Replace $$...$$ first, then $...$
    let processed = content;

    // Replace display math $$...$$
    processed = processed.replace(/\$\$(.+?)\$\$/gs, (_, math) => {
      try {
        return `<div class="my-1 overflow-x-auto text-center">${katex.renderToString(math.trim(), {
          displayMode: true,
          throwOnError: false,
        })}</div>`;
      } catch {
        return `$$${math}$$`;
      }
    });

    // Replace inline math $...$
    processed = processed.replace(/\$(.+?)\$/g, (_, math) => {
      try {
        return `<span class="inline-block px-0.5">${katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false,
        })}</span>`;
      } catch {
        return `$${math}$`;
      }
    });

    // Replace linebreaks \n with <br/>
    processed = processed.replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>');

    // If displayMode was explicitly set and not already wrapped
    if (displayMode && !content.includes('$')) {
      try {
        return katex.renderToString(content.trim(), {
          displayMode: true,
          throwOnError: false,
        });
      } catch {
        return content;
      }
    }

    return processed;
  }, [content, displayMode]);

  return (
    <div
      className={`leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};
