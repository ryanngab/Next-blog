// // pages/api/blog/[id].ts
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;
//   const apiKey = process.env.BLOGGER_API_KEY;
//   const blogId = process.env.BLOG_ID;

//   if (!apiKey || !blogId) {
//     return res.status(500).json({ message: 'Missing API key or Blog ID' });
//   }

//   try {
//     const response = await fetch(
//       `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${id}?key=${apiKey}`
//     );

//     if (!response.ok) {
//       return res.status(response.status).json({ message: 'Failed to fetch post' });
//     }

//     const post = await response.json();
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// }


export async function GET(req) {
    try {
      // Extract `id` from the URL path
      const url = new URL(req.url);
      const id = url.pathname.split("/").pop(); // Get `id` from the path
  
      // Ensure required environment variables are available
      const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!blogId || !apiKey) {
        throw new Error("Missing environment variables for blog ID or API key");
      }
  
      // Fetch data from the Blogger API
      const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${id}?key=${apiKey}`);
      
      if (!res.ok) {
        throw new Error(`Blogger API error: ${res.statusText}`);
      }
  
      const data = await res.json();
      return new Response(JSON.stringify(data), { status: 200 });
  
    } catch (error) {
      console.error("Error in API route:", error);
      return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), { status: 500 });
    }
  }
  

