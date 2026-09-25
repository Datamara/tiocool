import BlogGrid from "@/components/Blog/BlogGrid";
import BlogHero from "@/components/Blog/BlogHero";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { getBlogPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <Navbar theme="light" />
      <main>
        <BlogHero />
        <BlogGrid posts={posts} />
      </main>
      <Footer />
    </>
  );
}
