import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const maxResults = 10;
  const urlParams = new URL(req.url);
  const page = parseInt(urlParams.searchParams.get('page') || '1');
  const pageSize = parseInt(urlParams.searchParams.get('pageSize') || '8');

  let allPosts: any[] = [];
  let nextPageToken = null;

  try {
    do {
      const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=${maxResults}${
        nextPageToken ? `&pageToken=${nextPageToken}` : ''
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        return NextResponse.json({ error: data.error.message }, { status: data.error.code });
      }

      allPosts = [...allPosts, ...(data.items || [])];
      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    const startIndex = (page - 1) * pageSize;
    const paginatedPosts = allPosts.slice(startIndex, startIndex + pageSize);

    return NextResponse.json({
      posts: paginatedPosts,
      totalPosts: allPosts.length,
      totalPages: Math.ceil(allPosts.length / pageSize),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}