import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PORTFOLIO_THEMES } from "@/lib/portfolioThemes";
import ThemePreview from "./ThemePreview";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const theme = PORTFOLIO_THEMES.find((t) => t.slug === slug);
  if (!theme) return { title: "Not Found" };
  return {
    title: `${theme.name} — Preview | The Digital Inviters`,
    description: theme.shortDescription,
    openGraph: {
      title: `${theme.name} — ${theme.tagline}`,
      description: theme.shortDescription,
      images: [theme.image],
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
