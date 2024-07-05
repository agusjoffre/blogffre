import { NextRequest, NextResponse } from "next/server";
import { tagSchema } from "../../route";
import {
  deleteOneTagById,
  updateOneTagById,
} from "@/app/api/(services)/tagsServices";
import { TagPosgres } from "@/lib/types";
import { checkIfUserIsAdmin } from "@/app/api/(services)/authServices";

type TagsIDUserIDContext = {
  params: {
    id: string;
    userId: string;
  };
};

// update by id
export const PUT = async (req: NextRequest, context: TagsIDUserIDContext) => {
  const { params } = context;

  // check if userId is admin
  const isAdmin = await checkIfUserIsAdmin(params.userId);

  if (!isAdmin)
    return NextResponse.json({
      status: 401,
      error: "Unauthorized",
    });

  const body = await req.json();
  tagSchema.parse(body);

  const validationResult = tagSchema.safeParse(body);

  if (!validationResult.success)
    return NextResponse.json({
      status: 400,
      error: validationResult.error.errors,
    });

  const validatedBody = validationResult.data;

  const { error, data, status, statusText } = (await updateOneTagById(
    params.id,
    validatedBody
  )) as TagPosgres;

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};

// delete by id
export const DELETE = async (
  req: NextRequest,
  context: TagsIDUserIDContext
) => {
  const { params } = context;

  const isAdmin = await checkIfUserIsAdmin(params.userId);

  if (!isAdmin)
    return NextResponse.json({
      status: 401,
      error: "Unauthorized",
    });

  const { error, data, status, statusText } = (await deleteOneTagById(
    params.id
  )) as TagPosgres;

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};
