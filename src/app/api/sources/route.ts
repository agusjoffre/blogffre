import { NextRequest, NextResponse } from "next/server";
import { createOneSource, getAllSources } from "../(services)/sourcesServices";
import { SourcePosgres } from "@/lib/types";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  const { error, data, status, statusText } =
    (await getAllSources()) as SourcePosgres;

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};

export const sourceSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  sourceSchema.parse(body);

  const validationResult = sourceSchema.safeParse(body);

  if (!validationResult.success)
    return NextResponse.json({
      status: 400,
      error: validationResult.error.errors,
    });

  const validatedBody = validationResult.data;

  const { data, error, status, statusText } = (await createOneSource(
    validatedBody
  )) as SourcePosgres;

  if (status !== 200 && status !== 201)
    return NextResponse.json({ error, status, statusText });

  return NextResponse.json({ data, status });
};
