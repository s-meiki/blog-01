import type { Metadata } from 'next';
import './globals.css';
import { site } from '@/lib/siteConfig';
import { GA } from '@/lib/ga';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.title}`
  },
  description: site.description,
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.title,
    title: site.title,
    description: site.description
  },
  twitter: {
    card: 'summary_large_image',
    creator: site.twitter
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <JsonLd
          schema={{
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: site.author,
            url: site.url,
            sameAs: [
              site.twitter?.startsWith('@')
                ? `https://twitter.com/${site.twitter.replace(/^@/, '')}`
                : site.twitter
            ].filter(Boolean)
          }}
        />
        <GA />
        <Header />
        <main className="flex-1 py-10">
          <div className="container">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
