"use client";

import { useState } from "react";

interface TagFilterProps {
  tags: string[];
  onSelect: (tag: string) => void;
}

export default function TagFilter({ tags, onSelect }: TagFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string>("");

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    onSelect(tag);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 px-6 py-8">
      <button
        onClick={() => handleTagClick("")}
        className={`px-4 py-2 rounded-full text-sm transition-colors ${
          selectedTag === ""
            ? "bg-blue-600 text-white"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            selectedTag === tag
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
