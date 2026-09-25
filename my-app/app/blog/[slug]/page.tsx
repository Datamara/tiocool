import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/Blog/BlogArticle";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

type BlogPostPageProps = PageProps<"/blog/[slug]">;

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Artículo no encontrado | Tío Cool" };
  }

  return {
    title: `${post.title} | Tío Cool`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar theme="light" />
      <main>
        <BlogArticle post={post} />
      </main>
      <Footer />
    </>
  );
}
