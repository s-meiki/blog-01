import { PortableTextBlock } from '@portabletext/react'

export type PostType = {
  title: string;
  publishedAt: string;
  body: PortableTextBlock[];
  mainImage: string;
};

