// app/api/blog/post/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const { id } = params;

  try {
    const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${id}?key=${apiKey}`);
    const data = await response.json();

    const post = {
      id: data.id,
      image: data.images ? data.images[0].url : 'default-image-url',
      title: data.title,
      author: data.author.displayName,
      date: new Date(data.published).toLocaleDateString(),
      content: data.content,
    };

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
