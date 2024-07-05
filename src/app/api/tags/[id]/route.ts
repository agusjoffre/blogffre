import { NextRequest, NextResponse } from "next/server";
import { getOneTagById } from "../../(services)/tagsServices";
import { TagPosgres } from "@/lib/types";

export type Context = {
  params: {
    id: string;
  };
};

// get by id
export const GET = async (req: NextRequest, context: Context) => {
  const { params } = context;

  const { error, data, status, statusText } = (await getOneTagById(
    params.id
  )) as TagPosgres;

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};
