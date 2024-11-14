// components/blog/CardBlog.tsx
import React from "react";
import { Bookmark } from "lucide-react";

interface Post {
  id: number;
  image: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface AllCardBlogProps {
  posts: Post[];
}

const AllCardBlog: React.FC<AllCardBlogProps> = ({ posts }) => (
    <>
    {posts.map((post) => (
      <div
        key={post.id}
        className="relative overflow-hidden transition-shadow duration-300 border shadow rounded-xl bg-card text-card-foreground hover:shadow-xl group"
      >
        {/* Image with overlay */}
        <div className="relative">
          <img
            src={`https://${post.image}`}
            alt={post.title}
            className="object-cover w-full h-48"
            loading="lazy"
          />

          {/* Bookmark button without tooltip */}
          <div className="absolute z-10 top-2 right-2">
            <button
              aria-label="Bookmark"
              className="p-2 transition bg-white rounded-full bg-opacity-80 hover:bg-opacity-100"
            >
              <Bookmark className="w-5 h-5 text-gray-800" />
            </button>
          </div>

          {/* Overlay for "Read Article" text */}
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
            <span className="text-lg font-semibold text-white">Read Article</span>
          </div>
        </div>

        {/* Text content */}
        <div className="p-6">
          <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
          <p className="mb-4 text-gray-600">{post.content}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
        </div>
      </div>
    ))}
    </>
);

export default AllCardBlog;
