"use server";
import { User, UserPosgres } from "@/lib/types";
import db from "@/supabase/supabaseClient";

export const checkIfUserIsAdmin = async (
  sessionId: string
): Promise<boolean> => {
  const { data, error } = await db
    .from("users")
    .select("role")
    .eq("id", sessionId);
  if (error) return false;
  if (data.length === 0) return false;
  if (!data) return false;
  if (data[0].role !== "admin") return false;

  return true;
};

export const checkIfUserIsOwnerOfAccount = async (
  sessionId: string,
  userId: string
): Promise<boolean> => {
  if (!sessionId || !userId) return false;
  if (sessionId === userId) return true;
  return false;
};

export const getAllUsers = async (): Promise<UserPosgres> => {
  const { data, error, status, statusText, count } = await db
    .from("users")
    .select();

  if (error)
    return {
      count: 0,
      data: [],
      error,
      status,
      statusText,
    };

  if (status !== 200 && status !== 201) {
    return {
      count: 0,
      data: [],
      error: { message: "Failed to fetch users.", status: 500 },
      status,
      statusText,
    };
  }

  if (data.length === 0)
    return {
      count: 0,
      data: [],
      error: { message: "No users found. Count 0", status: 404 },
      status,
      statusText,
    };

  if (!data)
    return {
      count: 0,
      data: [],
      error: { message: "No users found. Data undefined", status: 404 },
      status,
      statusText,
    };
  return {
    count,
    data,
    error,
    status,
    statusText,
  };
};

export const getOneUserById = async (userId: string): Promise<UserPosgres> => {
  const { data, error, status, statusText, count } = await db
    .from("users")
    .select()
    .eq("id", userId);

  if (error)
    return {
      count: 0,
      data: [],
      error,
      status,
      statusText,
    };

  if (status !== 200 && status !== 201) {
    return {
      count: 0,
      data: [],
      error: { message: "Failed to fetch user.", status: 500 },
      status,
      statusText,
    };
  }

  if (data.length === 0)
    return {
      count: 0,
      data: [],
      error: { message: "No user found. Count 0", status: 404 },
      status,
      statusText,
    };

  if (!data)
    return {
      count: 0,
      data: [],
      error: { message: "No user found. Data undefined", status: 404 },
      status,
      statusText,
    };

  return {
    count,
    data,
    error,
    status,
    statusText,
  };
};

export const createOneUser = async (userData: User): Promise<UserPosgres> => {
  const { count, data, error, status, statusText } = await db
    .from("users")
    .insert(userData)
    .select();

  if (error)
    return {
      count: 0,
      data: [],
      error,
      status,
      statusText,
    };

  if (status !== 200 && status !== 201)
    return {
      count: 0,
      data: [],
      error: { message: "Failed to create user." },
      status,
      statusText,
    };

  if (!data) return { count: 0, data: [], error, status, statusText };

  if (data.length === 0)
    return {
      count: 0,
      data: [],
      error: { message: "No user found." },
      status,
      statusText,
    };

  return { count, data, error, status, statusText };
};

export const updateOneUserById = async (
  userId: string,
  userData: User
): Promise<UserPosgres> => {
  const { count, data, error, status, statusText } = await db
    .from("users")
    .update(userData)
    .eq("id", userId)
    .select();

  if (error)
    return {
      count: 0,
      data: [],
      error,
      status,
      statusText,
    };

  if (status !== 200 && status !== 201)
    return {
      count: 0,
      data: [],
      error: { message: "Failed to update user." },
      status,
      statusText,
    };

  if (!data) return { count: 0, data: [], error, status, statusText };

  if (data.length === 0)
    return {
      count: 0,
      data: [],
      error: { message: "No user found." },
      status,
      statusText,
    };

  return { count, data, error, status, statusText };
};

export const deleteOneUserById = async (
  userId: string
): Promise<UserPosgres> => {
  const { count, data, error, status, statusText } = await db
    .from("users")
    .delete()
    .eq("id", userId)
    .select();

  if (error)
    return {
      count: 0,
      data: [],
      error,
      status,
      statusText,
    };

  if (status !== 200 && status !== 201)
    return {
      count: 0,
      data: [],
      error: { message: "Failed to delete user." },
      status,
      statusText,
    };

  if (!data) return { count: 0, data: [], error, status, statusText };

  if (data.length === 0)
    return {
      count: 0,
      data: [],
      error: { message: "No user found." },
      status,
      statusText,
    };

  return { count, data, error, status, statusText };
};
