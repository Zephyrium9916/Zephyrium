"use client";

import { useState, useEffect } from "react";

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

interface UsePostsReturn {
  posts: Post[];
  tags: string[];
  filterByTag: (tag: string) => void;
  loading: boolean;
}

export default function usePosts(): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  const mockPosts: Post[] = [
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

  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setPosts(mockPosts);
      setFilteredPosts(mockPosts);

      // Extract unique tags
      const uniqueTags = Array.from(
        new Set(mockPosts.flatMap((post) => post.tags))
      );
      setTags(uniqueTags);

      setLoading(false);
    }, 1000);
  }, []);

  const filterByTag = (tag: string) => {
    if (!tag) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.tags.includes(tag)));
    }
  };

  return { posts: filteredPosts, tags, filterByTag, loading };
}
