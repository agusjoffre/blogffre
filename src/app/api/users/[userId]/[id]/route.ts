import {
  checkIfUserIsOwnerOfAccount,
  createOneUser,
  deleteOneUserById,
  getOneUserById,
  updateOneUserById,
} from "@/app/api/(services)/authServices";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type UserIdRouteContext = {
  params: {
    sessionId: string;
    userId: string;
  };
};

export const GET = async (req: NextRequest, context: UserIdRouteContext) => {
  const { params } = context;
  const { data, error, status, statusText } = await getOneUserById(
    params.userId
  );

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};

export const userSchema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required" }),
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(6, { message: "Email has to be at least 6 characters" }),
  username: z
    .string()
    .min(1, { message: "Username has to be at least 1 character" }),
  role: z.enum(["admin", "user"]),
  studyarea: z.string().optional(),
  image_url: z.string().url().optional(),
  id: z.string().min(1, { message: "Id has to be at least 1 character" }),
});

export const PUT = async (req: NextRequest, context: UserIdRouteContext) => {
  const body = await req.json();
  userSchema.parse(body);

  const validationResult = userSchema.safeParse(body);

  if (!validationResult.success)
    return NextResponse.json({
      status: 400,
      error: validationResult.error.errors,
    });

  const validatedBody = validationResult.data;

  // check if user is owner of the account
  const { params } = context;
  const isOwnerOfAccount = await checkIfUserIsOwnerOfAccount(
    params.sessionId,
    params.userId
  );

  if (!isOwnerOfAccount)
    return NextResponse.json({
      status: 401,
      error: "Unauthorized",
    });

  const { data, error, status, statusText } = await updateOneUserById(
    params.userId,
    validatedBody
  );

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};
export const DELETE = async (req: NextRequest, context: UserIdRouteContext) => {
  const { params } = context;

  const isOwnerOfAccount = await checkIfUserIsOwnerOfAccount(
    params.sessionId,
    params.userId
  );

  if (!isOwnerOfAccount)
    return NextResponse.json({
      status: 401,
      error: "Unauthorized",
    });

  const { data, error, status, statusText } = await deleteOneUserById(
    params.userId
  );

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};
