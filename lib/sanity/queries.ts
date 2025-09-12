export const postsQuery = `
*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  'slug': slug.current,
  excerpt,
  publishedAt,
  'updatedAt': coalesce(updatedAt, _updatedAt),
  'coverImage': coalesce(coverImage.asset->url, mainImage.asset->url),
  categories[]->{ _id, title, 'slug': slug.current, description },
  tags[]->{ _id, title, 'slug': slug.current, description }
}`;

// ページネーション用（総件数 + 指定範囲のアイテム）
// $offset: 取得開始位置, $end: 取得終了位置
export const paginatedPostsQuery = `
{
  'total': count(*[_type == "post" && defined(slug.current)]),
  'items': *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[$offset...$end] {
    _id,
    title,
    'slug': slug.current,
    excerpt,
    publishedAt,
    'coverImage': coalesce(coverImage.asset->url, mainImage.asset->url)
  }
}`;

export const latestPostsQuery = `
*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...6] {
  _id,
  title,
  'slug': slug.current,
  excerpt,
  publishedAt,
  'coverImage': coalesce(coverImage.asset->url, mainImage.asset->url)
}`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  'slug': slug.current,
  excerpt,
  publishedAt,
  'updatedAt': coalesce(updatedAt, _updatedAt),
  'coverImage': coalesce(coverImage.asset->url, mainImage.asset->url),
  categories[]->{ _id, title, 'slug': slug.current },
  tags[]->{ _id, title, 'slug': slug.current },
  'content': coalesce(content, body)
}`;

export const postByIdQuery = `
*[_type == "post" && _id == $id][0] {
  _id,
  title,
  'slug': slug.current,
  excerpt,
  publishedAt,
  'updatedAt': coalesce(updatedAt, _updatedAt),
  'coverImage': coalesce(coverImage.asset->url, mainImage.asset->url),
  categories[]->{ _id, title, 'slug': slug.current },
  tags[]->{ _id, title, 'slug': slug.current },
  'content': coalesce(content, body)
}`;

export const allSlugsQuery = `*[_type == "post" && defined(slug.current)].slug.current`;

// カテゴリ/タグの全スラッグ
export const allCategorySlugsQuery = `*[_type == "category" && defined(slug.current)].slug.current`;
export const allTagSlugsQuery = `*[_type == "tag" && defined(slug.current)].slug.current`;

// カテゴリ/タグの件数付き一覧（sitemap拡充用）
export const categoriesWithCountQuery = `
*[_type == "category" && defined(slug.current)]{
  'slug': slug.current,
  'count': count(*[_type == "post" && references(^._id)])
}`;

export const tagsWithCountQuery = `
*[_type == "tag" && defined(slug.current)]{
  'slug': slug.current,
  'count': count(*[_type == "post" && references(^._id)])
}`;

export const postsByCategoryQuery = `
*[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)] | order(publishedAt desc) {
  _id,
  title,
  'slug': slug.current,
  excerpt,
  publishedAt,
  'coverImage': coalesce(coverImage.asset->url, mainImage.asset->url)
}`;

export const postsByTagQuery = `
*[_type == "post" && references(*[_type == "tag" && slug.current == $slug]._id)] | order(publishedAt desc) {
  _id,
  title,
  'slug': slug.current,
  excerpt,
  publishedAt,
  'coverImage': coalesce(coverImage.asset->url, mainImage.asset->url)
}`;

// カテゴリ/タグのページネーション用
export const paginatedPostsByCategoryQuery = `
{
  'total': count(*[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)]),
  'items': *[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)] | order(publishedAt desc)[$offset...$end] {
    _id,
    title,
    'slug': slug.current,
    excerpt,
    publishedAt,
    'coverImage': coalesce(coverImage.asset->url, mainImage.asset->url)
  }
}`;

export const paginatedPostsByTagQuery = `
{
  'total': count(*[_type == "post" && references(*[_type == "tag" && slug.current == $slug]._id)]),
  'items': *[_type == "post" && references(*[_type == "tag" && slug.current == $slug]._id)] | order(publishedAt desc)[$offset...$end] {
    _id,
    title,
    'slug': slug.current,
    excerpt,
    publishedAt,
    'coverImage': coalesce(coverImage.asset->url, mainImage.asset->url)
  }
}`;

export const profileQuery = `
*[_type == "profile"][0]{
  name,
  'avatarUrl': avatar.asset->url,
  bio,
  twitter,
  instagram,
  youtube
}`;

export const searchPostsQuery = `
*[_type == "post" && defined(slug.current) && (
  title match $q || pt::text(coalesce(content, body)) match $q
)] | order(publishedAt desc)[0...50] {
  _id,
  title,
  'slug': slug.current,
  excerpt,
  publishedAt,
  'coverImage': coalesce(coverImage.asset->url, mainImage.asset->url)
}`;
