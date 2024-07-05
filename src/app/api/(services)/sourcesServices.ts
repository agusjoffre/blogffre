"use server";
import { Source, SourcePosgres } from "@/lib/types";
import db from "@/supabase/supabaseClient";

export const getAllSources = async (): Promise<SourcePosgres> => {
  const sourcesDB = await db.from("sources").select();

  if (!sourcesDB)
    return {
      data: [],
      error: { message: "Failed to fetch sources.", status: 500 },
      count: 0,
      status: 500,
      statusText: "Failed to fetch sources.",
    };

  if (sourcesDB.status === 400)
    return {
      data: [],
      error: { message: sourcesDB.error?.message, status: sourcesDB.status },
      count: sourcesDB.count,
      status: sourcesDB.status,
      statusText: sourcesDB.statusText,
    };

  if (sourcesDB.count === 0)
    return {
      count: sourcesDB.count,
      data: [],
      error: { message: "No sources found. Count 0", status: sourcesDB.status },
      status: sourcesDB.status,
      statusText: sourcesDB.statusText,
    };

  if (!sourcesDB.data)
    return {
      count: 0,
      data: [],
      error: {
        message: "No sources found. Data undefined",
        status: sourcesDB.status,
      },
      status: sourcesDB.status,
      statusText: sourcesDB.statusText,
    };

  return sourcesDB;
};
export const createOneSource = async (
  sourceData: Source
): Promise<SourcePosgres> => {
  const createdSource = await db.from("sources").insert(sourceData).select();

  if (!createdSource)
    return {
      count: 0,
      data: [],
      error: { message: "Failed to create source.", status: 500 },
      status: 500,
      statusText: "Failed to create source.",
    };

  if (createdSource.status === 400) {
    return {
      count: 0,
      data: [],
      error: {
        message: createdSource.error?.message,
        status: createdSource.status,
      },
      status: createdSource.status,
      statusText: createdSource.statusText,
    };
  }

  if (!createdSource.data)
    return {
      count: 0,
      data: [],
      error: {
        message: "No source could be created",
        status: createdSource.status,
      },
      status: createdSource.status,
      statusText: createdSource.statusText,
    };

  return {
    count: createdSource.count,
    data: createdSource.data,
    error: createdSource.error,
    status: createdSource.status,
    statusText: createdSource.statusText,
  };
};

export const getOneSourceById = async (id: string): Promise<SourcePosgres> => {
  const sourceFound = await db.from("sources").select().eq("id", id);

  if (!sourceFound)
    return {
      count: 0,
      data: [],
      error: { message: "Failed to fetch source.", status: 500 },
      status: 500,
      statusText: "Failed to fetch source.",
    };

  if (sourceFound.status === 400)
    return {
      count: 0,
      data: [],
      error: {
        message: sourceFound.error?.message,
        status: sourceFound.status,
      },
      status: sourceFound.status,
      statusText: sourceFound.statusText,
    };

  if (!sourceFound.data)
    return {
      count: 0,
      data: [],
      error: {
        message: "No source found",
        status: sourceFound.status,
      },
      status: sourceFound.status,
      statusText: sourceFound.statusText,
    };

  return sourceFound;
};

export const updateOneSourceById = async (
  id: string,
  sourceData: Source
): Promise<SourcePosgres> => {
  const updatedSource = await db
    .from("sources")
    .update(sourceData)
    .eq("id", id)
    .select();

  if (!updatedSource)
    return {
      count: 0,
      data: [],
      error: { message: "Failed to update source.", status: 500 },
      status: 500,
      statusText: "Failed to update source.",
    };

  if (updatedSource.status === 400)
    return {
      count: 0,
      data: [],
      error: {
        message: updatedSource.error?.message,
        status: updatedSource.status,
      },
      status: updatedSource.status,
      statusText: updatedSource.statusText,
    };

  if (!updatedSource.data)
    return {
      count: 0,
      data: [],
      error: {
        message: "No source found",
        status: updatedSource.status,
      },
      status: updatedSource.status,
      statusText: updatedSource.statusText,
    };

  return updatedSource;
};

export const deleteOneSourceById = async (
  id: string
): Promise<SourcePosgres> => {
  const deletedSource = await db.from("sources").delete().eq("id", id).select();

  if (!deletedSource)
    return {
      count: 0,
      data: [],
      error: { message: "Failed to delete source.", status: 500 },
      status: 500,
      statusText: "Failed to delete source.",
    };

  if (deletedSource.status === 400)
    return {
      count: 0,
      data: [],
      error: {
        message: deletedSource.error?.message,
        status: deletedSource.status,
      },
      status: deletedSource.status,
      statusText: deletedSource.statusText,
    };

  if (!deletedSource.data)
    return {
      count: 0,
      data: [],
      error: {
        message: "No source found",
        status: deletedSource.status,
      },
      status: deletedSource.status,
      statusText: deletedSource.statusText,
    };

  return deletedSource;
};
