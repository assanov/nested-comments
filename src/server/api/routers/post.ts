import { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input: { id } }) => {
      return ctx.prisma.post.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          body: true,
          comments: {
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              message: true,
              parentId: true,
              createdAt: true,
              user: { select: { id: true, name: true } },
            },
          },
        },
      });
    }),
});

export type RouterOutput = inferRouterOutputs<typeof postRouter>;
export type AllPostsRes = RouterOutput["getAll"];
export type PostById = RouterOutput["getById"];
export type PostByIdComment = NonNullable<PostById>["comments"][0];
