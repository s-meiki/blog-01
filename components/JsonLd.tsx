export function JsonLd({ schema }: { schema: Record<string, any> }) {
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      // JSON-LD はそのまま埋め込む
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

