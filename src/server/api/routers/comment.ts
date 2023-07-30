import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        postId: z.string(),
        parentId: z.string().optional(),
      })
    )
    .mutation(async ({ input: { message, postId, parentId }, ctx }) => {
      await ctx.prisma.comment.create({
        data: { message, postId, parentId, userId: ctx.session.user.id },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      await ctx.prisma.comment.delete({ where: { id } });
    }),

  toggleLike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const data = { commentId: id, userId: ctx.session.user.id };
      const existingLike = await ctx.prisma.like.findUnique({
        where: { userId_commentId: data },
      });

      if (existingLike == null) {
        await ctx.prisma.like.create({ data });
        return { addedLike: true };
      } else {
        await ctx.prisma.like.delete({ where: { userId_commentId: data } });
        return { addedLike: false };
      }
    }),
});
