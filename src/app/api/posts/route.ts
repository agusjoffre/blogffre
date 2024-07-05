import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  getAllPosts,
  insertPost,
  insertPostSources,
  insertPostTags,
} from "../(services)/postServices";
import { SourcePosgres, TagPosgres } from "@/lib/types";

// get all posts
export const GET = async () => {
  const { data, error, status, statusText } = await getAllPosts();

  if (status !== 200 && status !== 201) {
    return NextResponse.json({ error, status, statusText });
  }

  return NextResponse.json({ data, status });
};

export const postSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  content: z.string().min(1),
  userId: z.string().min(1),
  imageUrl: z.string().optional(),
  tags: z.array(
    z.object({
      name: z.string().min(1),
      id: z.string().optional(),
    })
  ),
  sources: z.array(
    z.object({
      name: z.string().min(1),
      id: z.string().optional(),
    })
  ),
});

// soy un putisimo genio
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  postSchema.parse(body);
  const validationResult = postSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json({
      status: 400,
      error: validationResult.error.errors,
    });
  }

  const { content, sources, subtitle, tags, title, userId, imageUrl } =
    validationResult.data;

  const { data: postData, error: postError } = await insertPost(
    title,
    subtitle,
    content,
    userId,
    imageUrl
  );

  if (postError) {
    return NextResponse.json({
      status: 400,
      error: postError,
    });
  }

  const postId = postData[0].id as string;

  if (!postId) {
    return NextResponse.json({
      status: 400,
      error: "Failed to insert post",
    });
  }

  const tagsIdPromise = tags.map(async (tag) => {
    if (!tag.id) {
      // insertar tag (fetch /api/tags POST)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: tag.name,
        }),
      });

      if (!res.ok) return new Error("Failed to insert tag: " + res.statusText);

      const {
        data: tagFetched,
        error,
        status,
        statusText,
      } = (await res.json()) as TagPosgres;

      if (status !== 200 && status !== 201) {
        return new Error("Failed to insert tag: " + statusText);
      }
      return tagFetched[0].id;
    }

    return tag.id;
  });

  const tagsResolved = await Promise.all(tagsIdPromise);

  const sourcesIdPromise = sources.map(async (source) => {
    if (!source.id) {
      // insertar source (fetch /api/sources POST)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sources`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: source.name,
          }),
        }
      );

      if (!res.ok)
        return new Error("Failed to insert source: " + res.statusText);

      const {
        data: sourceFetched,
        error,
        status,
        statusText,
      } = (await res.json()) as SourcePosgres;

      if (status !== 200 && status !== 201) {
        return new Error("Failed to insert source: " + statusText + error);
      }

      return sourceFetched[0].id;
    }

    return source.id;
  });

  const sourcesResolved = await Promise.all(sourcesIdPromise);

  const validTagIds = tagsResolved.filter(
    (tagId) => tagId !== undefined
  ) as string[];

  const postTagsPromise = validTagIds.map(async (tagId) => {
    const {
      data: postTagData,
      error,
      status,
      statusText,
    } = await insertPostTags(postId, tagId);

    if (status !== 200 && status !== 201) {
      return new Error("Failed to insert post tag: " + statusText + error);
    }

    return postTagData;
  });

  const validSourceIds = sourcesResolved.filter(
    (sourceId) => sourceId !== undefined
  ) as string[];

  const postSourcesPromise = validSourceIds.map(async (sourceId) => {
    const { data, error, status, statusText } = await insertPostSources(
      postId,
      sourceId
    );

    if (status !== 200 && status !== 201) {
      return new Error("Failed to insert post source: " + statusText + error);
    }

    return data;
  });

  const postSourceResult = await Promise.all([...postSourcesPromise]);

  const postTagResult = await Promise.all([...postTagsPromise]);

  return NextResponse.json({
    status: 201,
    message: "Post created successfully",
    data: {
      ...postData[0],
      sourcesId: sourcesResolved,
      tagsId: tagsResolved,
    },
    error: null,
  });
};
