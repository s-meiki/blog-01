export type Category = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

export type Tag = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date
  coverImage?: string; // URL
  categories?: Category[];
  tags?: Tag[];
  content?: string; // temporary placeholder
};

