import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { BLOG_POSTS, getPostBySlug, getAdjacentPosts } from "@/data/blog-posts";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title.ar} — Sky Expo`,
    description: post.excerpt.ar,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title.ar,
      description: post.excerpt.ar,
      url: `https://skyexpo.com.sa/blog/${post.slug}`,
      images: [{ url: post.cover }],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.ar,
      description: post.excerpt.ar,
      images: [post.cover],
    },
  };
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(params.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title.ar,
    description: post.excerpt.ar,
    image: `https://skyexpo.com.sa${post.cover}`,
    datePublished: post.date,
    inLanguage: "ar",
    author: { "@type": "Organization", name: "SKY EXPO" },
    publisher: { "@type": "Organization", name: "SKY EXPO" },
    mainEntityOfPage: `https://skyexpo.com.sa/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticle post={post} prev={prev} next={next} />
    </>
  );
}
