"use server";
import { Tag, TagPosgres } from "@/lib/types";
import db from "@/supabase/supabaseClient";

export const getAllTags = async (): Promise<TagPosgres> => {
  const tagsDB = await db.from("tags").select();

  if (!tagsDB) {
    return {
      data: [],
      error: { message: "Failed to fetch tags.", status: 500 },
      count: 0,
      status: 500,
      statusText: "Failed to fetch tags.",
    };
  }

  if (tagsDB.status === 400) {
    return {
      data: [],
      error: { message: tagsDB.error?.message, status: tagsDB.status },
      count: tagsDB.count,
      status: tagsDB.status,
      statusText: tagsDB.statusText,
    };
  }

  if (tagsDB.count === 0) {
    return {
      count: tagsDB.count,
      data: [],
      error: { message: "No tags found. Count 0", status: tagsDB.status },
      status: tagsDB.status,
      statusText: tagsDB.statusText,
    };
  }

  if (!tagsDB.data)
    return {
      count: tagsDB.count,
      data: [],
      error: {
        message: "No tags found. Data undefined",
        status: tagsDB.status,
      },
      status: tagsDB.status,
      statusText: tagsDB.statusText,
    };

  return tagsDB;
};

export const createTag = async (tagData: Tag): Promise<TagPosgres> => {
  const createdTag = await db.from("tags").insert(tagData).select();

  if (!createdTag)
    return {
      count: 0,
      data: [],
      error: { message: "Failed to create tag.", status: 500 },
      status: 500,
      statusText: "Failed to create tag.",
    };

  if (createdTag.status === 400) {
    return {
      count: 0,
      data: [],
      error: { message: createdTag.error?.message, status: createdTag.status },
      status: createdTag.status,
      statusText: createdTag.statusText,
    };
  }

  if (!createdTag.data) {
    return {
      count: 0,
      data: [],
      error: { message: "No tag could be created", status: createdTag.status },
      status: createdTag.status,
      statusText: createdTag.statusText,
    };
  }

  return {
    count: createdTag.count,
    data: createdTag.data,
    error: createdTag.error,
    status: createdTag.status,
    statusText: createdTag.statusText,
  };
};

export const getOneTagById = async (id: string): Promise<TagPosgres> => {
  const tag = await db.from("tags").select().eq("id", id);

  if (!tag)
    return {
      count: 0,
      data: [],
      error: { message: "Failed to fetch tag.", status: 500 },
      status: 500,
      statusText: "Failed to fetch tag.",
    };

  if (tag.status === 400)
    return {
      count: 0,
      data: [],
      error: { message: tag.error?.message, status: tag.status },
      status: tag.status,
      statusText: tag.statusText,
    };

  if (!tag.data)
    return {
      count: 0,
      data: [],
      error: { message: "No tag found", status: tag.status },
      status: tag.status,
      statusText: tag.statusText,
    };

  return {
    count: tag.count,
    data: tag.data,
    error: tag.error,
    status: tag.status,
    statusText: tag.statusText,
  };
};

export const updateOneTagById = async (
  id: string,
  tagData: Tag
): Promise<TagPosgres> => {
  const updatedTag = await db
    .from("tags")
    .update(tagData)
    .eq("id", id)
    .select();

  if (!updatedTag)
    return {
      count: 0,
      data: [],
      error: { message: "Failed to update tag.", status: 500 },
      status: 500,
      statusText: "Failed to update tag.",
    };

  if (updatedTag.status === 400)
    return {
      count: 0,
      data: [],
      error: { message: updatedTag.error?.message, status: updatedTag.status },
      status: updatedTag.status,
      statusText: updatedTag.statusText,
    };

  if (!updatedTag.data)
    return {
      count: 0,
      data: [],
      error: { message: "No tag found", status: updatedTag.status },
      status: updatedTag.status,
      statusText: updatedTag.statusText,
    };

  return {
    count: updatedTag.count,
    data: updatedTag.data,
    error: updatedTag.error,
    status: updatedTag.status,
    statusText: updatedTag.statusText,
  };
};

export const deleteOneTagById = async (id: string): Promise<TagPosgres> => {
  const deletedTag = await db.from("tags").delete().eq("id", id).select();

  if (!deletedTag)
    return {
      count: 0,
      data: [],
      error: { message: "Failed to delete tag.", status: 500 },
      status: 500,
      statusText: "Failed to delete tag.",
    };

  if (deletedTag.status === 400)
    return {
      count: 0,
      data: [],
      error: { message: deletedTag.error?.message, status: deletedTag.status },
      status: deletedTag.status,
      statusText: deletedTag.statusText,
    };

  if (!deletedTag.data)
    return {
      count: 0,
      data: [],
      error: { message: "No tag found", status: deletedTag.status },
      status: deletedTag.status,
      statusText: deletedTag.statusText,
    };

  return {
    count: deletedTag.count,
    data: deletedTag.data,
    error: deletedTag.error,
    status: deletedTag.status,
    statusText: deletedTag.statusText,
  };
};

export const searchTagByName = async (search: string): Promise<TagPosgres> => {
  const tagsSearched = await db.rpc("search_tags", { search_text: search });

  if (!tagsSearched)
    return {
      count: 0,
      data: [],
      error: { message: "Failed to search tag.", status: 500 },
      status: 500,
      statusText: "Failed to search tag.",
    };

  if (tagsSearched.status === 400)
    return {
      count: 0,
      data: [],
      error: {
        message: tagsSearched.error?.message,
        status: tagsSearched.status,
      },
      status: tagsSearched.status,
      statusText: tagsSearched.statusText,
    };

  if (!tagsSearched.data)
    return {
      count: 0,
      data: [],
      error: { message: "No tag found", status: tagsSearched.status },
      status: tagsSearched.status,
      statusText: tagsSearched.statusText,
    };

  return {
    count: tagsSearched.data.length,
    data: tagsSearched.data,
    error: tagsSearched.error,
    status: tagsSearched.status,
    statusText: tagsSearched.statusText,
  };
};
