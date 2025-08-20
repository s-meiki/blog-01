import { PortableText, type PortableTextReactComponents } from '@portabletext/react';
import Link from 'next/link';

const components: PortableTextReactComponents = {
  block: {
    h1: ({ children }) => <h1 id={String(children)}>{children}</h1>,
    h2: ({ children }) => <h2 id={String(children)}>{children}</h2>,
    h3: ({ children }) => <h3 id={String(children)}>{children}</h3>
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

