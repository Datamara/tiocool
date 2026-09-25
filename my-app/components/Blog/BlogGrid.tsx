"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { formatBlogDate, type BlogPost } from "@/lib/blog";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type BlogGridProps = {
  posts: BlogPost[];
};

export default function BlogGrid({ posts }: BlogGridProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".blog-grid-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="border-t border-black/10 bg-white px-6 py-20 md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-[90rem]">
        <ul className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="blog-grid-item group block border border-black/10 p-6 transition-colors hover:border-black/25 md:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                    {post.category}
                  </span>
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-black/35">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-xl font-bold uppercase leading-tight tracking-[0.03em] text-black transition-opacity group-hover:opacity-70 md:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-4 font-display text-sm font-bold leading-relaxed text-black/65">
                  {post.excerpt}
                </p>
                <p className="mt-6 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-black/40">
                  {formatBlogDate(post.date)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
