import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';
import { sanityConfig } from '@/lib/sanity/config';
import { allSlugsQuery } from '@/lib/sanity/queries';

export async function GET() {
  const projectId = sanityConfig.projectId;
  const dataset = sanityConfig.dataset;
  const hasProject = Boolean(projectId);

  let postCount: number | null = null;
  let sampleSlugs: string[] | null = null;
  let error: string | null = null;

  if (hasProject) {
    try {
      postCount = await sanityClient.fetch<number>('count(*[_type == "post"])');
      const slugs = await sanityClient.fetch<string[]>(allSlugsQuery);
      sampleSlugs = Array.isArray(slugs) ? slugs.slice(0, 5) : null;
    } catch (e: any) {
      error = String(e?.message || e);
    }
  }

  return NextResponse.json({
    projectId,
    dataset,
    hasProject,
    postCount,
    sampleSlugs,
    error,
  });
}

