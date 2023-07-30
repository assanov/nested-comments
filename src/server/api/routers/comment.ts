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
});
