// // app/api/blog/posts/route.js
// export async function GET() {
//     const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
//     const apiKey = process.env.NEXT_PUBLIC_API_KEY;
//     const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`);
//     const data = await res.json();
//     return new Response(JSON.stringify(data.items || []));
//   }
  

// app/api/blog/posts/route.js
export async function GET(request) {
    const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
    // Ambil query parameter pageToken dari request URL
    const { searchParams } = new URL(request.url);
    const pageToken = searchParams.get("pageToken");
  
    // Buat URL untuk Blogger API, termasuk pageToken jika ada
    let url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=8`;
    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }
  
    try {
      const res = await fetch(url);
      const data = await res.json();
  
      // Mengembalikan data posting dan nextPageToken jika tersedia
      return new Response(
        JSON.stringify({
          posts: data.items || [],
          nextPageToken: data.nextPageToken || null,
        }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
        status: 500,
      });
    }
  }
  