export const postsQuery = `
*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  'slug': slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  'coverImage': coverImage.asset->url,
  categories[]->{ _id, title, 'slug': slug.current, description },
  tags[]->{ _id, title, 'slug': slug.current, description }
}`;

export const latestPostsQuery = `
*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...6] {
  _id,
  title,
  'slug': slug.current,
  excerpt,
  publishedAt,
  'coverImage': coverImage.asset->url
}`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  'slug': slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  'coverImage': coverImage.asset->url,
  categories[]->{ _id, title, 'slug': slug.current },
  tags[]->{ _id, title, 'slug': slug.current },
  content
}`;

export const allSlugsQuery = `*[_type == "post" && defined(slug.current)].slug.current`;

export const postsByCategoryQuery = `
*[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)] | order(publishedAt desc) {
  _id,
  title,
  'slug': slug.current,
  excerpt,
  publishedAt,
  'coverImage': coverImage.asset->url
}`;

export const postsByTagQuery = `
*[_type == "post" && references(*[_type == "tag" && slug.current == $slug]._id)] | order(publishedAt desc) {
  _id,
  title,
  'slug': slug.current,
  excerpt,
  publishedAt,
  'coverImage': coverImage.asset->url
}`;

export const profileQuery = `
*[_type == "profile"][0]{
  name,
  avatar,
  bio,
  twitter,
  instagram,
  youtube
}`;
