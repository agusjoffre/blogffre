import { NextRequest, NextResponse } from "next/server";
import { Context } from "../../tags/[id]/route";
import {
  deletePost,
  getOnePostById,
  updateOnePostById,
} from "../../(services)/postServices";
import { postSchema } from "../route";

export const GET = async (req: NextRequest, context: Context) => {
  const { params } = context;

  const { data, error, status } = await getOnePostById(params.id);

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status });
  }

  return NextResponse.json({ data, status });
};

export const PUT = async (req: NextRequest, context: Context) => {
  const body = await req.json();
  postSchema.parse(body);

  const validatedBody = postSchema.safeParse(body);

  if (!validatedBody.success)
    return NextResponse.json({
      status: 400,
      error: validatedBody.error.errors,
    });

  const {
    content,
    sources,
    subtitle,
    tags,
    title,
    userId: user_id,
    imageUrl,
  } = validatedBody.data;

  const { params } = context;

  const { data, error, status } = await updateOnePostById(params.id, {
    content,
    sources,
    subtitle,
    tags,
    title,
    user_id,
    imageUrl,
  });

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status });
  }

  return NextResponse.json({ data, status });
};
export const DELETE = async (req: NextRequest, context: Context) => {
  const { params } = context;

  const { data, error, status } = await deletePost(params.id);

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status });
  }

  return NextResponse.json({ data, status });
};
