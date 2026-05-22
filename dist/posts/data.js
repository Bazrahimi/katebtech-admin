// src/posts/data.ts
import "server-only";
import { notFound } from "next/navigation";
import { createSqlClient } from "@katebtech/auth/db";
import { getSession } from "@katebtech/auth/session";
import { POST_STATUS } from "./definitions";
export const createPostData = ({ postgresUrl, sessionEncodedKey, }) => {
    const sql = createSqlClient({ postgresUrl });
    const insertPost = async (opts) => {
        const { userId, data, slug, createdAt } = opts;
        const rows = await sql `
      INSERT INTO posts (
        user_id,
        title,
        slug,
        content_html,
        excerpt,
        category_id,
        status_code,
        hero_img_path,
        is_featured,
        created_at
      )
      VALUES (
        ${userId},
        ${data.title},
        ${slug},
        ${data.contentHtml},
        ${data.excerpt},
        ${data.categoryId},
        ${data.statusCode},
        ${data.heroImgPath ?? null},
        ${data.isFeatured},
        ${createdAt}
      )
      RETURNING
        id
    `;
        return rows[0] ?? null;
    };
    const updatePostRow = async (opts) => {
        const { id, data } = opts;
        const rows = await sql `
      UPDATE posts
      SET
        title          = ${data.title},
        content_html   = ${data.contentHtml},
        excerpt        = ${data.excerpt},
        category_id    = ${data.categoryId},
        status_code    = ${data.statusCode},
        hero_img_path  = ${data.heroImgPath ?? null},
        is_featured    = ${data.isFeatured}
      WHERE id = ${id}
      RETURNING
        id

    `;
        return rows[0] ?? null;
    };
    const getPostsWithWhere = async (whereFragment, limit) => {
        return sql `
      SELECT
        p.id,
        p.title,
        p.slug,
        p.hero_img_path AS "heroImgPath",

        CASE
          WHEN p.hero_img_path IS NULL OR BTRIM(p.hero_img_path) = ''
          THEN p.excerpt
          ELSE NULL
        END AS "excerpt",

        p.is_featured AS "isFeatured",
        p.category_id AS "categoryId"

      FROM posts p
      WHERE ${whereFragment}
      ORDER BY
        p.created_at DESC
      LIMIT ${limit};
    `;
    };
    const getPostBySlugId = async (postId) => {
        const rows = await sql `
    SELECT
      p.id,
      p.title,
      p.slug,
      p.content_html AS "contentHtml",
      p.excerpt,
      p.status_code AS "statusCode",
      p.category_id AS "categoryId",
      p.hero_img_path AS "heroImgPath",
      p.is_featured AS "isFeatured",
      to_char(
        p.created_at AT TIME ZONE 'Australia/Melbourne',
        'DD MON YYYY'
      ) AS "createdAt",
      to_char(
        p.updated_at AT TIME ZONE 'Australia/Melbourne',
        'DD MON YYYY'
      ) AS "updatedAt"
    FROM posts p
    WHERE p.id = ${postId}
    LIMIT 1;
  `;
        return rows[0] ?? null;
    };
    const getFeaturedPostsByCategory = async (categoryId, limit) => {
        return getPostsWithWhere(sql `
        p.status_code = ${POST_STATUS.PUBLISHED}
        AND p.is_featured = true
        AND p.category_id = ${categoryId}
      `, limit);
    };
    const getPublishedPostsByCategory = async (categoryId, limit) => {
        return getPostsWithWhere(sql `
        p.status_code = ${POST_STATUS.PUBLISHED}
        AND p.category_id = ${categoryId}
      `, limit);
    };
    const postCardSelect = sql `
    SELECT
      p.id,
      p.title,
      p.slug,
      p.hero_img_path AS "heroImgPath",

      CASE
        WHEN p.hero_img_path IS NULL OR BTRIM(p.hero_img_path) = ''
        THEN p.excerpt
        ELSE NULL
      END AS "excerpt",

      p.is_featured AS "isFeatured",
      p.category_id AS "categoryId"

    FROM posts p
  `;
    const getLatestPostsByCategory = async ({ postId, categoryId, limit = 6, }) => {
        return sql `
    ${postCardSelect}
    WHERE
      p.status_code = ${POST_STATUS.PUBLISHED}
      AND p.id <> ${postId}
      AND p.category_id = ${categoryId}
    ORDER BY p.created_at DESC
    LIMIT ${limit};
  `;
    };
    const getRelatedPostsByTitle = async ({ postId, categoryId, title, limit = 6, }) => {
        const cleanedTitle = title.trim();
        if (!cleanedTitle) {
            return getLatestPostsByCategory({
                postId,
                categoryId,
                limit,
            });
        }
        const rows = await sql `
    WITH q AS (
      SELECT websearch_to_tsquery('simple', ${cleanedTitle}) AS query
    )
    ${postCardSelect}
    CROSS JOIN q
    WHERE
      p.status_code = ${POST_STATUS.PUBLISHED}
      AND p.id <> ${postId}
      AND p.category_id = ${categoryId}
      AND to_tsvector(
        'simple',
        COALESCE(p.title, '') || ' ' || COALESCE(p.excerpt, '')
      ) @@ q.query
    ORDER BY
      ts_rank_cd(
        to_tsvector(
          'simple',
          COALESCE(p.title, '') || ' ' || COALESCE(p.excerpt, '')
        ),
        q.query
      ) DESC,
      p.created_at DESC
    LIMIT ${limit};
  `;
        if (rows.length > 0) {
            return rows;
        }
        return getLatestPostsByCategory({
            postId,
            categoryId,
            limit,
        });
    };
    const getEditPostById = async ({ postId, }) => {
        const rows = await sql `
      SELECT
        id,
        title,
        content_html AS "contentHtml",
        excerpt,
        category_id AS "categoryId",
        status_code AS "statusCode",
        hero_img_path AS "heroImgPath",
        is_featured AS "isFeatured",
        created_at AS "createdAt"
      FROM posts
      WHERE id = ${postId}
      LIMIT 1;
    `;
        const post = rows[0];
        if (!post) {
            notFound();
        }
        return post;
    };
    const getPostCounts = async () => {
        const session = await getSession(sessionEncodedKey);
        const base = {
            [POST_STATUS.DRAFT]: 0,
            [POST_STATUS.PUBLISHED]: 0,
            [POST_STATUS.ARCHIVED]: 0,
        };
        if (!session) {
            return base;
        }
        try {
            const rows = await sql `
        SELECT
          status_code AS "statusCode",
          COUNT(*)::int AS count
        FROM posts
        GROUP BY status_code;
      `;
            for (const row of rows) {
                base[row.statusCode] = row.count;
            }
        }
        catch (err) {
            const code = typeof err === "object" && err && "code" in err
                ? err.code
                : undefined;
            if (code !== "42P01") {
                throw err;
            }
        }
        return base;
    };
    const getPostsByStatus = async (statusCode) => {
        const session = await getSession(sessionEncodedKey);
        if (!session) {
            return [];
        }
        return sql `
      SELECT
        id,
        title,
        slug,
        is_featured AS "isFeatured",
        status_code AS "statusCode",
        to_char(created_at, 'DD MON YYYY') AS "createdAt",
        category_id AS "categoryId"
      FROM posts
      WHERE status_code = ${statusCode}
      ORDER BY created_at DESC;
    `;
    };
    const getPostSeoById = async (postId) => {
        const rows = await sql `
    SELECT
      p.id,
      p.title,
      p.slug,
      p.category_id AS "categoryId",
      p.hero_img_path AS "heroImgPath",
      p.excerpt
    FROM posts p
    WHERE p.id = ${postId}
    LIMIT 1;
  `;
        const post = rows[0];
        if (!post) {
            notFound();
        }
        return post;
    };
    const getPublishedPostsForSitemap = async () => {
        return sql `
    SELECT
      p.slug,
      p.category_id AS "categoryId",
      p.updated_at AS "updatedAt",
      p.created_at AS "createdAt"
    FROM posts p
    WHERE p.status_code = ${POST_STATUS.PUBLISHED}
    ORDER BY COALESCE(p.updated_at, p.created_at) DESC;
  `;
    };
    return {
        insertPost,
        updatePostRow,
        getPostBySlugId,
        getFeaturedPostsByCategory,
        getPublishedPostsByCategory,
        getRelatedPostsByTitle,
        getEditPostById,
        getPostCounts,
        getPostsByStatus,
        getPublishedPostsForSitemap,
        getPostSeoById,
    };
};
