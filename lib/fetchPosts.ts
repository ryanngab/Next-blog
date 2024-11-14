// lib/fetchPosts.ts
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    image?: string;
  }
  
  interface FetchPostsResponse {
    posts: BlogPost[];
    nextPageToken: string | null;
  }
  
  export async function fetchPosts(pageToken?: string): Promise<FetchPostsResponse> {
    const url = `/api/posts${pageToken ? `?pageToken=${pageToken}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  }
  