import type { Metadata } from 'next';
import Image from 'next/image';
import { sanityFetch } from '@/lib/sanity/client';
import { profileQuery } from '@/lib/sanity/queries';
import { RichText } from '@/components/RichText';
import type { Profile } from '@/types/content';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const profile = await sanityFetch<Profile>(profileQuery, {}, 3600);
  if (!profile) return { title: 'プロフィール' };
  return {
    title: `${profile.name}｜プロフィール`,
    description: profile?.bio ? undefined : 'プロフィール情報'
  };
}

export default async function ProfilePage() {
  const profile = await sanityFetch<Profile>(profileQuery, {}, 3600);
  if (!profile) {
    return (
      <article className="prose max-w-none">
        <h1>プロフィール</h1>
        <p>プロフィール情報を準備中です。</p>
      </article>
    );
  }
  return (
    <article className="prose max-w-none">
      <header className="not-prose mb-6 flex items-center gap-4">
        {profile.avatar?.asset ? (
          <Image
            src={profile.avatar.asset.url ?? ''}
            alt={profile.name}
            width={96}
            height={96}
            className="size-24 rounded-full object-cover"
          />)
        : null}
        <div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <div className="mt-2 flex gap-4 text-sm">
            {profile.twitter ? (
              <a href={profile.twitter} target="_blank" rel="noreferrer" className="underline">Twitter</a>
            ) : null}
            {profile.instagram ? (
              <a href={profile.instagram} target="_blank" rel="noreferrer" className="underline">Instagram</a>
            ) : null}
            {profile.youtube ? (
              <a href={profile.youtube} target="_blank" rel="noreferrer" className="underline">YouTube</a>
            ) : null}
          </div>
        </div>
      </header>
      <section>
        <RichText value={profile.bio} />
      </section>
    </article>
  );
}
