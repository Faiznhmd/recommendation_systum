import { VoyageEmbeddings } from '@langchain/community/embeddings/voyage';

export const embeddings = new VoyageEmbeddings({
  apiKey: process.env.API_KEY,
  inputType: 'document',
});

export const embedd = async (text: string) => {
  const embedding = await embeddings.embedQuery(text);
  return embedding;
};
