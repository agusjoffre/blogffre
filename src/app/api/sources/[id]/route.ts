import { Source, SourcePosgres } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { Context } from "../../tags/[id]/route";
import {
  deleteOneSourceById,
  getOneSourceById,
  updateOneSourceById,
} from "../../(services)/sourcesServices";
import { sourceSchema } from "../route";

export const GET = async (req: NextRequest, context: Context) => {
  const { params } = context;
  const { data, error, status, statusText } = (await getOneSourceById(
    params.id
  )) as SourcePosgres;

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};
export const PUT = async (req: NextRequest, context: Context) => {
  const { params } = context;
  const body = req.json();
  sourceSchema.safeParse(body);

  const validationResult = sourceSchema.safeParse(body);

  if (!validationResult.success)
    return NextResponse.json({
      status: 400,
      error: validationResult.error.errors,
    });

  const validatedBody = validationResult.data;

  const { error, data, status, statusText } = (await updateOneSourceById(
    params.id,
    validatedBody
  )) as SourcePosgres;

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};
export const DELETE = async (req: NextRequest, context: Context) => {
  const { params } = context;

  const { data, error, status, statusText } = await deleteOneSourceById(
    params.id
  );

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};
