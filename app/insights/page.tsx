"use client";

import PostCard from "./PostCard";
import TagFilter from "./TagFilter";
import { useState } from "react";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  tags: string[];
  date: string;
  readTime: string;
  slug: string;
}

export default function InsightsPage() {
  // For client-side rendering, we'll use the mock data directly
  const posts: Post[] = [
    {
      id: "1",
      title: "The Future of AI in Cybersecurity",
      excerpt: "Exploring how artificial intelligence is revolutionizing threat detection and response strategies.",
      image: "/images/ai-cybersecurity.jpg",
      tags: ["AI", "Cybersecurity", "Innovation"],
      date: "Dec 15, 2024",
      readTime: "5 min read",
      slug: "future-of-ai-cybersecurity"
    },
    {
      id: "2",
      title: "Zero Trust Architecture Explained",
      excerpt: "Understanding the principles and implementation of zero trust security models.",
      image: "/images/zero-trust.jpg",
      tags: ["Security", "Zero Trust"],
      date: "Jan 10, 2025",
      readTime: "7 min read",
      slug: "zero-trust-architecture-explained"
    },
    {
      id: "3",
      title: "Blockchain for Secure Data Sharing",
      excerpt: "How blockchain technology can enhance data security and privacy.",
      image: "/images/blockchain-data.jpg",
      tags: ["Blockchain", "Data Security"],
      date: "Feb 5, 2025",
      readTime: "6 min read",
      slug: "blockchain-for-secure-data-sharing"
    }
  ];

  const tags = Array.from(new Set(posts.flatMap(post => post.tags)));
  const [selectedTag, setSelectedTag] = useState<string>("");

  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-x-hidden">
      <section className="pt-40 px-4 md:px-16 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 tracking-tight">
          Zephyrium Insights
        </h1>
        <p className="text-lg md:text-xl mb-12 max-w-2xl leading-relaxed text-neutral-300">
          Cinematic briefings, cybersecurity revelations, and dev logs from the frontier. Stay ahead with Zephyrium.
        </p>

        <TagFilter tags={tags} onSelect={setSelectedTag} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {filteredPosts.map((post: Post, index: number) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
