import { PortableText, type PortableTextReactComponents } from '@portabletext/react';
import Link from 'next/link';

function plainTextFromChildren(value: any): string {
  // value.children is an array of spans with .text
  const children = (value?.children ?? []) as Array<{ text?: string }>;
  return children.map((c) => c?.text ?? '').join('');
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 100);
}

const components: PortableTextReactComponents = {
  block: {
    h1: ({ children, value }) => {
      const text = plainTextFromChildren(value);
      const id = slugify(text);
      return (
        <h1 id={id} className="scroll-mt-24 mt-10">
          {children}
        </h1>
      );
    },
    h2: ({ children, value }) => {
      const text = plainTextFromChildren(value);
      const id = slugify(text);
      return (
        <h2 id={id} className="scroll-mt-24 mt-8">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const text = plainTextFromChildren(value);
      const id = slugify(text);
      return (
        <h3 id={id} className="scroll-mt-24 mt-6">
          {children}
        </h3>
      );
    }
  },
  marks: {
    link: ({ children, value }) => {
      const href = (value as any)?.href || '#';
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noreferrer" className="underline">
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="underline">
          {children}
        </Link>
      );
    }
  }
};

export function RichText({ value }: { value: any }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
