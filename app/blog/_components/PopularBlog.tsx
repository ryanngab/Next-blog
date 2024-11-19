import React from 'react';

interface PopularPostItem {
  id: number;
  image: string;
  title: string;
  excerpt: string;
}

interface PopularPostProps {
  posts: PopularPostItem[];
}

const PopularBlog: React.FC<PopularPostProps> = ({ posts }) => (
  <div className="rounded-lg border bg-card p-4 text-card-foreground">
    <h2 className="mb-4 text-xl font-semibold">Popular Posts</h2>
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="group flex cursor-pointer gap-3">
          <img
            src={`https://${post.image}`}
            alt={post.title}
            className="h-16 w-16 rounded-md object-cover"
            loading="lazy"
          />
          <div>
            <h3 className="text-base font-medium transition-colors group-hover:text-blue-600">
              {post.title}
            </h3>
            <p className="mt-1 text-xs text-gray-600">{post.excerpt}</p>
            <button className="mt-1 text-xs text-blue-600 transition-colors hover:text-blue-800">
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PopularBlog;
