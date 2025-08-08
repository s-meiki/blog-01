const previewSecret = process.env.SANITY_PREVIEW_SECRET;

export function resolveProductionUrl(doc) {
  const baseUrl = "http://localhost:3000";
  const previewUrl = new URL(baseUrl);

  previewUrl.pathname = "/api/draft";
  previewUrl.searchParams.append("secret", previewSecret);
  previewUrl.searchParams.append("slug", doc?.slug?.current ?? "/");

  return previewUrl.toString();
}