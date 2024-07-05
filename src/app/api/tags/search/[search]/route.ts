import { NextResponse } from "next/server";
import { Context } from "../../[id]/route";
import { z } from "zod";
import { searchTagByName } from "../../../(services)/tagsServices";
import { TagPosgres } from "@/lib/types";

export const searchedTagSchema = z.object({
  search: z.string().max(100).min(2),
});

export const GET = async (req: NextResponse, context: Context) => {
  const { params } = context;
  const { search } = searchedTagSchema.parse(params);

  if (!search) {
    return NextResponse.json({
      status: 400,
      error: "Invalid search",
    });
  }

  const validationResult = searchedTagSchema.safeParse({ search });

  if (!validationResult.success)
    return NextResponse.json({
      status: 400,
      error: validationResult.error.errors,
    });

  const { data, error, status, statusText } = (await searchTagByName(
    validationResult.data.search
  )) as TagPosgres;

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};
