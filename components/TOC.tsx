"use client";

import { useEffect, useMemo, useState } from 'react';

type Heading = { level: number; text: string; id: string };

export function TOC({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const ids = useMemo(() => headings.map((h) => h.id), [headings]);

  useEffect(() => {
    if (!ids.length) return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        } else {
          // fallback: pick the closest above the viewport
          const above = entries
            .filter((e) => e.boundingClientRect.top <= (window.innerHeight * 0.3))
            .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? -1 : 1));
          if (above.length > 0) setActiveId(above[0].target.id);
        }
      },
      {
        root: null,
        // Trigger when heading is roughly in the upper half of the viewport
        rootMargin: '-40% 0% -55% 0%'
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <aside className="toc not-prose mt-6 rounded-lg border p-4">
      <div className="font-semibold text-sm text-gray-700">目次</div>
      <ul className="mt-2">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 1 ? '' : h.level === 2 ? 'lvl-2' : 'lvl-3'}>
            <a href={`#${h.id}`} className={activeId === h.id ? 'active' : undefined}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

