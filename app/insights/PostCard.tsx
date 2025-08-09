"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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

interface PostCardProps {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors duration-300"
    >
      <Link href={`/insights/${post.slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
