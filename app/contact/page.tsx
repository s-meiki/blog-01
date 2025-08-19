import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'お問い合わせ' };

export default function ContactPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">お問い合わせ</h1>
      <p className="mt-3 text-gray-600">
        現段階ではメールまたはSNSのDMにてご連絡ください。
      </p>
      <ul className="mt-4 list-disc pl-6 text-sm">
        <li>
          メール: <a href="mailto:hello@example.com" className="underline">hello@example.com</a>
        </li>
        <li>
          X(Twitter): <a href="https://twitter.com/" className="underline" target="_blank" rel="noreferrer">@meiki</a>
        </li>
        <li>
          Instagram: <a href="https://instagram.com/" className="underline" target="_blank" rel="noreferrer">@meiki</a>
        </li>
      </ul>
    </div>
  );
}

