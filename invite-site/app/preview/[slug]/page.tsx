import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PORTFOLIO_THEMES } from "@/lib/portfolioThemes";
import { getStoryBySlug } from "@/lib/sampleStories";
import ThemePreview from "./ThemePreview";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const theme = PORTFOLIO_THEMES.find((t) => t.slug === slug);
  if (!theme) return { title: "Not Found" };
  const story = getStoryBySlug(slug);
  const previewImage = story?.heroImage || theme.image;
  const description = story?.cardTeaser || theme.shortDescription;
  return {
    title: theme.name,
    description,
    openGraph: {
      title: `${theme.name} — ${theme.tagline}`,
      description,
      images: [previewImage],
    },
  };
}

export function generateStaticParams() {
  return PORTFOLIO_THEMES.map((t) => ({ slug: t.slug }));
}

export default async function PreviewPage({ params }: Props) {
  const { slug } = await params;
  const theme = PORTFOLIO_THEMES.find((t) => t.slug === slug);
  if (!theme) notFound();
  return <ThemePreview theme={theme} />;
}
