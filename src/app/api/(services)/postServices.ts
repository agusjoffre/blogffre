"use server";

import {
  Post,
  PostPosgres,
  SourcePostPosgres,
  TagPosgres,
  TagPostPosgres,
} from "@/lib/types";
import db from "@/supabase/supabaseClient";

export const insertPost = async (
  title: string,
  subtitle: string,
  content: string,
  userId: string,
  imageUrl?: string
): Promise<PostPosgres> => {
  const { data, error, status, statusText } = await db
    .from("posts")
    .insert([
      {
        title,
        subtitle,
        content,
        user_id: userId,
        image_url: imageUrl,
      },
    ])
    .select();

  if (error) return { count: 0, data: [], error, status, statusText };

  if (status !== 200 && status !== 201) {
    return {
      count: 0,
      data: [],
      error: { message: "Failed to insert post." },
      status,
      statusText,
    };
  }

  if (!data) return { count: 0, data: [], error, status, statusText };

  if (data.length === 0)
    return {
      count: 0,
      data: [],
      error: { message: "No posts found. Count 0" },
      status,
      statusText,
    };

  return {
    count: 1,
    data,
    error: null,
    status,
    statusText,
  };
};

export const insertPostTags = async (
  post_id: string,
  tag_id: string
): Promise<TagPostPosgres> => {
  const { data, error, status, statusText } = await db
    .from("post_tags")
    .insert({
      post_id,
      tag_id,
    })
    .select();

  if (error) return { count: 0, data: [], error, status, statusText };

  if (status !== 200 && status !== 201) {
    return {
      count: 0,
      data: [],
      error: { message: "Failed to insert post." },
      status,
      statusText,
    };
  }

  if (!data) return { count: 0, data: [], error, status, statusText };

  if (data.length === 0)
    return {
      count: 0,
      data: [],
      error: { message: "No posts found. Count 0" },
      status,
      statusText,
    };

  return {
    count: 1,
    data,
    error: null,
    status,
    statusText,
  };
};

export const insertPostSources = async (
  post_id: string,
  source_id: string
): Promise<SourcePostPosgres> => {
  const { data, error, status, statusText } = await db
    .from("post_sources")
    .insert({
      post_id,
      source_id,
    })
    .select();

  if (error) return { count: 0, data: [], error, status, statusText };

  if (status !== 200 && status !== 201) {
    return {
      count: 0,
      data: [],
      error: { message: "Failed to insert post." },
      status,
      statusText,
    };
  }

  if (!data) return { count: 0, data: [], error, status, statusText };

  if (data.length === 0)
    return {
      count: 0,
      data: [],
      error: { message: "No posts found. Count 0" },
      status,
      statusText,
    };

  return { count: 1, data, error: null, status, statusText };
};

export const getAllPosts = async (): Promise<PostPosgres> => {
  const { count, data, error, status, statusText } = await db
    .from("posts")
    .select();

  if (error) return { count: 0, data: [], error, status, statusText };

  if (status !== 200 && status !== 201) {
    return {
      count: 0,
      data: [],
      error: { message: "Failed to get posts." },
      status,
      statusText,
    };
  }

  if (!data) return { count: 0, data: [], error, status, statusText };

  if (count === 0)
    return {
      count,
      data: [],
      error: { message: "No posts found. Count 0" },
      status,
      statusText,
    };

  return {
    count,
    data,
    error: null,
    status,
    statusText,
  };
};

export const getOnePostById = async (id: string): Promise<PostPosgres> => {
  const { data, error, status, statusText } = await db
    .from("posts")
    .select()
    .eq("id", id);

  if (error) return { count: 0, data: [], error, status, statusText };

  if (status !== 200 && status !== 201) {
    return {
      count: 0,
      data: [],
      error: { message: "Failed to get post." },
      status,
      statusText,
    };
  }

  if (!data) return { count: 0, data: [], error, status, statusText };

  if (data.length === 0)
    return {
      count: 0,
      data: [],
      error: { message: "No post found. Count 0" },
      status,
      statusText,
    };

  return {
    count: 1,
    data,
    error: null,
    status,
    statusText,
  };
};

export const updateOnePostById = async (
  id: string,
  postData: Post
): Promise<PostPosgres> => {
  const { count, data, error, status, statusText } = await db
    .from("posts")
    .update(postData)
    .eq("id", id);

  if (error) return { count: 0, data: [], error, status, statusText };

  if (status !== 200 && status !== 201) {
    return {
      count: 0,
      data: [],
      error: { message: "Failed to update post." },
      status,
      statusText,
    };
  }

  if (!data) return { count: 0, data: [], error, status, statusText };

  if (count === 0)
    return {
      count,
      data: [],
      error: { message: "No post found. Count 0" },
      status,
      statusText,
    };

  return {
    count,
    data,
    error: null,
    status,
    statusText,
  };
};

export const deletePost = async (id: string): Promise<PostPosgres> => {
  const { count, data, error, status, statusText } = await db
    .from("posts")
    .delete()
    .eq("id", id);

  if (error) return { count: 0, data: [], error, status, statusText };

  if (status !== 200 && status !== 201) {
    return {
      count: 0,
      data: [],
      error: { message: "Failed to delete post." },
      status,
      statusText,
    };
  }

  if (!data) return { count: 0, data: [], error, status, statusText };

  if (count === 0)
    return {
      count,
      data: [],
      error: { message: "No post found. Count 0" },
      status,
      statusText,
    };

  return {
    count,
    data,
    error: null,
    status,
    statusText,
  };
};
