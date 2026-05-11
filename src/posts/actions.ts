// src/posts/actions.ts

import "server-only";

import { slugify } from "@katebtech/core";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSqlClient } from "@katebtech/auth/db";
import { getSession } from "@katebtech/auth/session";
import { postAdminRoutes } from "../lib/routes/postAdminRoutes";

import { parseActionFormData } from "@katebtech/core";
import { createPostData } from "./data";
import { POST_STATUS } from "./definitions";
import { postSchema, type Post, type PostState } from "./schema";
import { postFailure, postSuccess } from "./actionHelper";

type DeleteAssetResult = {
  ok: boolean;
  message?: string;
};

type CreatePostActionsOptions = {
  postgresUrl: string;
  sessionEncodedKey: Uint8Array;
  deleteAsset?: (path: string) => Promise<DeleteAssetResult>;
};

export const createPostActions = ({
  postgresUrl,
  sessionEncodedKey,
  deleteAsset,
}: CreatePostActionsOptions) => {
  const sql = createSqlClient({ postgresUrl });

  const { insertPost, updatePostRow, getEditPostById } = createPostData({
    postgresUrl,
    sessionEncodedKey,
  });

  const allPostPath = postAdminRoutes.index();

  const parsePostId = (formData: FormData): number | null => {
    const rawPostId = formData.get("postId");

    if (rawPostId == null) return null;

    const postId = Number(rawPostId);

    if (!Number.isInteger(postId) || postId <= 0) {
      return null;
    }

    return postId;
  };

  const createPost = async (
    _prevState: PostState | undefined,
    formData: FormData,
  ): Promise<PostState> => {
    const session = await getSession(sessionEncodedKey);

    if (!session) {
      return {
        ok: false,
        message: "You are not allowed to create posts.",
      };
    }
    const parsed = parseActionFormData<typeof postSchema, PostState['errors']>({
      formData,
      schema: postSchema
    })
    if (!parsed.ok) {
      return parsed.state
    }
    



    const data = parsed.data;

    const postData: Post = {
      ...data,
      statusCode: POST_STATUS.PUBLISHED,
      isFeatured: true,
    };

    const slug = slugify(postData.title);
    const createdAt = new Date();

    try {
      const created = await insertPost({
        userId: session.userId,
        data: postData,
        slug,
        createdAt,
      });

      const message =
        postData.statusCode === POST_STATUS.PUBLISHED
          ? "Your post has been published"
          : "Your post has been saved as a draft.";

      return {
        ok: true,
        message,
        data,
      };
    } catch (err) {
      console.error("DB error inserting post:", err);

      return {
        ok: false,
        message: "Something went wrong while posting the post.",
        data,
      };
    }
  };

  const updatePost = async (
    _prevState: PostState | undefined,
    formData: FormData,
  ): Promise<PostState> => {
    const session = await getSession(sessionEncodedKey);

    if (!session) {
      return {
        ok: false,
        message: "You are not allowed to update post.",
      };
    }

    const idRaw = formData.get("id");
    const id = Number(idRaw);

    if (!id || !Number.isFinite(id) || id <= 0) {
      return {
        ok: false,
        message: "Invalid post id.",
      };
    }

    formData.delete("id");

    const parsed = parseActionFormData<typeof postSchema, PostState["errors"]>({
      formData, 
      schema: postSchema
    })

    if (!parsed.ok) {
      return parsed.state
    }
    const parsedData = parsed.data

    const existing = await getEditPostById({ postId: id });

    const data: Post = {
      ...parsedData,
      categoryId: existing.categoryId,
      statusCode: existing.statusCode,
      isFeatured: existing.isFeatured,
    };

    try {
      const updated = await updatePostRow({
        id,
        data,
      });

      if (!updated) {
        return {
          ok: false,
          message: "Post not found or could not be updated.",
          data,
        };
      }

      const message =
        data.statusCode === POST_STATUS.PUBLISHED
          ? "Your post has been updated and published."
          : "Your post changes have been saved.";

      return {
        ok: true,
        message,

        data,
      };
    } catch (err) {
      console.error("DB error updating post:", err);

      return {
        ok: false,
        message: "Something went wrong while updating the post.",
        data,
      };
    }
  };

  const featurePostAction = async (
    _prev: PostState | undefined,
    formData: FormData,
  ): Promise<PostState> => {
    const session = await getSession(sessionEncodedKey);

    if (!session) {
      return postFailure("You must be logged in.");
    }

    const postId = parsePostId(formData);

    if (!postId) {
      return postFailure("Invalid post ID.");
    }

    try {
      const rows = await sql<{ isFeatured: boolean }[]>`
        UPDATE posts
        SET is_featured = NOT is_featured
        WHERE id = ${postId}
        RETURNING is_featured AS "isFeatured";
      `;

      if (rows.length === 0) {
        return postFailure(
          "Not authorized to manage this post or post not found.",
        );
      }

      const nowFeatured = rows[0].isFeatured === true;

      revalidatePath(allPostPath);

      return postSuccess(
        nowFeatured ? "Published to homepage." : "Removed from homepage.",
      );
    } catch (err) {
      console.error("Failed to toggle featured", err);

      return postFailure("Database error.");
    }
  };

  const publishPostAction = async (
    _prev: PostState | undefined,
    formData: FormData,
  ): Promise<PostState> => {
    const session = await getSession(sessionEncodedKey);

    if (!session) {
      return postFailure("You must be logged in.");
    }

    const postId = parsePostId(formData);

    if (!postId) {
      return postFailure("Invalid post ID.");
    }

    try {
      const rows = await sql<{ statusCode: number }[]>`
        UPDATE posts 
        SET status_code = ${POST_STATUS.PUBLISHED} 
        WHERE id = ${postId}
        RETURNING status_code AS "statusCode";
      `;

      if (rows.length === 0) {
        return postFailure(
          "Not authorized to publish this post or post not found.",
        );
      }

      revalidatePath(allPostPath);

      return postSuccess("Post published.");
    } catch (err) {
      console.error("Failed to publish post", err);

      return postFailure("Database error.");
    }
  };

  const archivePostAction = async (
    _prev: PostState | undefined,
    formData: FormData,
  ): Promise<PostState> => {
    const session = await getSession(sessionEncodedKey);

    if (!session) {
      return postFailure("You must be logged in.");
    }

    const postId = parsePostId(formData);

    if (!postId) {
      return postFailure("Invalid post ID.");
    }

    try {
      const rows = await sql<{ statusCode: number }[]>`
        UPDATE posts 
        SET status_code = ${POST_STATUS.ARCHIVED} 
        WHERE id = ${postId}
        RETURNING status_code AS "statusCode";
      `;

      if (rows.length === 0) {
        return postFailure(
          "Not authorized to archive this post or post not found.",
        );
      }

      revalidatePath(allPostPath);

      return postSuccess("Post archived.");
    } catch (err) {
      console.error("Failed to archive post", err);

      return postFailure("Database error.");
    }
  };

  const deletePostAction = async (
    _prev: PostState | undefined,
    formData: FormData,
  ): Promise<PostState> => {
    const session = await getSession(sessionEncodedKey);

    if (!session) {
      return postFailure("You must be logged in.");
    }

    const postId = parsePostId(formData);

    if (!postId) {
      return postFailure("Invalid post ID.");
    }

    try {
      const rows = await sql<{ heroImgPath: string | null }[]>`
        SELECT hero_img_path AS "heroImgPath"
        FROM posts
        WHERE id = ${postId};
      `;

      if (rows.length === 0) {
        return postFailure("Post not found or not authorized.");
      }

      const heroImgPath = rows[0].heroImgPath;

      if (heroImgPath && deleteAsset) {
        const result = await deleteAsset(heroImgPath);

        if (!result.ok) {
          return postFailure(result.message || "Failed to delete post image.");
        }
      }

      await sql`
        DELETE FROM posts
        WHERE id = ${postId};
      `;
    } catch (err) {
      console.error("Failed to delete post", err);

      return postFailure("Database error.");
    }

    redirect(allPostPath);
  };

  return {
    createPost,
    updatePost,
    featurePostAction,
    publishPostAction,
    archivePostAction,
    deletePostAction,
  };
};
