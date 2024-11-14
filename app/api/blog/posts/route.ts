import { NextResponse } from 'next/server';

export async function GET() {
  const blogId = process.env.NEXT_PUBLIC_BLOG_ID; // Ambil blog ID dari .env.local
  const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Ambil API key dari .env.local

  try {
    const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=6`);
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


// // app/api/blog/posts/route.js
// export async function GET() {
//     const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
//     const apiKey = process.env.NEXT_PUBLIC_API_KEY;
//     const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`);
//     const data = await res.json();
//     return new Response(JSON.stringify(data.items || []));
//   }
  
// app/api/blog/posts/route.js
// export async function GET(request) {
//     const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
//     const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
//     // Retrieve the pageToken query parameter from request URL
//     const { searchParams } = new URL(request.url);
//     const pageToken = searchParams.get("pageToken");
  
//     // Create URL for Blogger API, including pageToken if available
//     let url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=8`;
//     if (pageToken) {
//         url += `&pageToken=${pageToken}`;
//     }
  
//     try {
//         const res = await fetch(url);
//         const data = await res.json();
  
//         // Return posts data and nextPageToken if available
//         return new Response(
//             JSON.stringify({
//                 posts: data.items || [],
//                 nextPageToken: data.nextPageToken || null,
//             }),
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//         return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
//             status: 500,
//         });
//     }
//   }