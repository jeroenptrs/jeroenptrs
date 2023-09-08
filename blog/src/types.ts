export type TTag = { title: string; path: string };
export type TTags = Record<string, Array<TTag>>;
export type TMetadata = {
  created: number;
  published?: number;
  authors: string[];
};
export type TFlags = {
  title: string | undefined;
  file: string | undefined;
  tags: string | undefined;
  authors: string | undefined;
};
export type TData = {
  pages: {
    file: string;
    title: string;
    metadata: TMetadata;
  }[];
  tags: TTags;
};
