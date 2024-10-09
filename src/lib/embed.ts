import { VoyageEmbeddings } from '@langchain/community/embeddings/voyage';

export const embeddings = new VoyageEmbeddings({
  apiKey: 'pa-mQW4PdObaOVyHyWhLdcJyWWhKAYtJhBF9uX_x9jcu_k',
  inputType: 'document',
});

export const embedd = async (text: string) => {
  const embedding = await embeddings.embedQuery(text);
  return embedding;
};
