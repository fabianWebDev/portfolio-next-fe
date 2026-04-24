import type { Metadata } from "next";
import { getApiBase } from "@/lib/api";
import { getSiteUrl, siteName } from "@/lib/site";

type ProjectForMeta = {
  title: string;
  short_description: string;
  image?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return { title: "Project" };
  }

  const base = getApiBase();
  const url = `${base}/projects/${id}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      return { title: "Project" };
    }
    const data = (await res.json()) as ProjectForMeta;
    if (!data?.title) {
      return { title: "Project" };
    }

    const description = (data.short_description || "").trim() || `Project by ${siteName}.`;
    const pageUrl = `${getSiteUrl()}/projects/${id}`;
    const images = data.image
      ? [{ url: data.image, alt: data.title }]
      : undefined;

    return {
      title: data.title,
      description,
      alternates: { canonical: pageUrl },
      openGraph: {
        type: "article",
        title: data.title,
        description,
        url: pageUrl,
        siteName,
        images,
      },
      twitter: {
        card: "summary_large_image",
        title: data.title,
        description,
        images: data.image ? [data.image] : undefined,
      },
    };
  } catch {
    return { title: "Project" };
  }
}

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
