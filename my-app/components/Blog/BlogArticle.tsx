"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { formatBlogDate, type BlogPost } from "@/lib/blog";

gsap.registerPlugin(useGSAP);

type BlogArticleProps = {
  post: BlogPost;
};

export default function BlogArticle({ post }: BlogArticleProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".blog-article-back", { y: 20, opacity: 0, duration: 0.6 })
        .from(".blog-article-meta", { y: 24, opacity: 0, duration: 0.7 }, "-=0.3")
        .from(".blog-article-title", { y: 40, opacity: 0, duration: 0.9 }, "-=0.45")
        .from(".blog-article-paragraph", { y: 24, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.4");
    },
    { scope: sectionRef },
  );

  return (
    <article
      ref={sectionRef}
      className="bg-white px-6 py-12 md:px-12 md:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="blog-article-back inline-block font-display text-[10px] font-bold uppercase tracking-[0.22em] text-black/45 transition-opacity hover:text-black"
        >
          ← Volver al blog
        </Link>

        <div className="blog-article-meta mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
            {post.category}
          </span>
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-black/35">
            {formatBlogDate(post.date)} · {post.readTime}
          </span>
        </div>

        <h1 className="blog-article-title mt-6 font-display text-3xl font-bold uppercase leading-[1.05] tracking-[0.02em] text-black md:text-5xl lg:text-6xl">
          {post.title}
        </h1>

        <div className="mt-10 space-y-6 border-t border-black/10 pt-10">
          {post.content.map((paragraph, index) => (
            <p
              key={index}
              className="blog-article-paragraph font-display text-base font-bold leading-relaxed text-black/75 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
