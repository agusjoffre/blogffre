import db from "@/supabase/supabaseClient";
import {
  checkIfUserIsAdmin,
  createOneUser,
  getAllUsers,
} from "../../(services)/authServices";
import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "./[id]/route";
import { UserPosgres } from "@/lib/types";

type UserRouteUserIdContext = {
  params: {
    userId: string;
  };
};

// get all users
export const GET = async (
  req: NextRequest,
  context: UserRouteUserIdContext
) => {
  const { params } = context;

  const userId = params.userId;

  if (!userId) return NextResponse.json({ status: 401, error: "Unauthorized" });

  const isAdmin = await checkIfUserIsAdmin(userId);

  if (!isAdmin)
    return NextResponse.json({ status: 401, error: "Unauthorized" });

  const { data, status, error, statusText } = await getAllUsers();

  if (error) return NextResponse.json({ error, status, statusText });

  if (!data)
    return NextResponse.json({
      error: { message: "No user found" },
      status,
      statusText,
    });

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  userSchema.parse(body);

  const validationResult = userSchema.safeParse(body);

  if (!validationResult.success)
    return NextResponse.json({
      status: 400,
      error: validationResult.error.errors,
    });

  const validatedBody = validationResult.data;

  const { data, error, status, statusText } = (await createOneUser(
    validatedBody
  )) as UserPosgres;

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};
