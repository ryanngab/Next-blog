import { NextResponse } from 'next/server';

export async function GET() {
  const blogId = process.env.NEXT_PUBLIC_BLOG_ID; // Ambil blog ID dari .env.local
  const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Ambil API key dari .env.local

  try {
    const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`);
    const data = await response.json();

    const posts = data.items.map((post) => ({
      id: post.id,
      image: post.images ? post.images[0].url : 'default-image-url', // Ganti dengan URL gambar default jika tidak ada
      title: post.title,
      author: post.author.displayName,
      date: new Date(post.published).toLocaleDateString(),
      content: post.content
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
} 