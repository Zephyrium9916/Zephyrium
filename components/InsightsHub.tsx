import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import usePosts from "../app/insights/hooks/usePosts";
import PostCard from "../app/insights/PostCard";
import TagFilter from "../app/insights/TagFilter";

export default function InsightsHub() {
  const { posts, tags, filterByTag } = usePosts();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <main
      ref={containerRef}
      className="relative px-6 md:px-16 lg:px-24 py-24 text-slate-100 bg-black min-h-screen"
    >
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight max-w-4xl mb-12"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Insights. Intelligence. Innovation.
      </motion.h1>

      <TagFilter tags={tags} onSelect={filterByTag} />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </section>
    </main>
  );
}
