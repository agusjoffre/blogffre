import { NextRequest, NextResponse } from "next/server";
import { createTag, getAllTags } from "../(services)/tagsServices";
import { TagPosgres } from "@/lib/types";
import { z } from "zod";

// get all tags
export const GET = async () => {
  const { error, data, status, statusText } =
    (await getAllTags()) as TagPosgres;

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};

export const tagSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

// post one tag
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  tagSchema.parse(body);

  const validationResult = tagSchema.safeParse(body);

  if (!validationResult.success)
    return NextResponse.json({
      status: 400,
      error: validationResult.error.errors,
    });

  const validatedBody = validationResult.data;

  const { error, data, status, statusText } = (await createTag(
    validatedBody
  )) as TagPosgres;

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};
