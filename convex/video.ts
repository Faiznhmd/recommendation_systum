import { v } from 'convex/values';
import { embedd } from '../src/lib/embed';
import {
  action,
  internalMutation,
  internalQuery,
  query,
} from './_generated/server';
import { internal } from './_generated/api';
import { Doc } from './_generated/dataModel';

export const fetchVideosData = internalQuery({
  args: {
    ids: v.array(v.id('videos')),
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const id of args.ids) {
      const video = await ctx.db.get(id);
      if (video) {
        results.push(video);
      }
    }
    return results;
  },
});
export const similiarVideos = action({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const queryEmbedding = await embedd(args.query);
    const result = await ctx.vectorSearch('videos', 'by_search', {
      vector: queryEmbedding,
      limit: 2,
    });
    const videosIds = result.map((r) => r._id);

    const videos: Array<Doc<'videos'>> = await ctx.runQuery(
      internal.video.fetchVideosData,
      {
        ids: videosIds,
      }
    );
    return videos;
  },
});

export const insertVideo = internalMutation({
  args: {
    title: v.string(),
    url: v.string(),
    description: v.string(),
    thumbnail: v.string(),
    category: v.string(),
    embeddings: v.array(v.float64()),
  },

  handler: async (ctx, args) => {
    if (
      !args.title ||
      !args.url ||
      !args.description ||
      !args.thumbnail ||
      !args.category
    ) {
      throw new Error('All fields are required');
    }
    const video = await ctx.db.insert('videos', {
      title: args.title,
      url: args.url,
      description: args.description,
      thumbnail: args.thumbnail,
      category: args.category,
      embeddings: args.embeddings,
    });
    return video;
  },
});

export const addVideos = action({
  args: {
    title: v.string(),
    url: v.string(),
    description: v.string(),
    thumbnail: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    if (
      !args.title ||
      !args.url ||
      !args.description ||
      !args.thumbnail ||
      !args.category
    ) {
      throw new Error('All fields are required');
    }
    const embedding = await embedd(args.title);

    await ctx.runMutation(internal.video.insertVideo, {
      title: args.title,
      url: args.url,
      description: args.description,
      thumbnail: args.thumbnail,
      category: args.category,
      embeddings: embedding,
    });
    return true;
  },
});

export const allVideos = query({
  args: {},
  handler: async (ctx) => {
    const videos = await ctx.db.query('videos').collect();
    return videos;
  },
});

export const getVideo = query({
  args: {
    id: v.id('videos'),
  },
  handler: async (ctx, args) => {
    if (!args.id) {
      return null;
    }

    const video = await ctx.db.get(args.id);
    return video;
  },
});
