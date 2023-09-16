import type { TTag } from "./types";

const url = (path: string) => `/${path}`;

export default function TagPage({ tag }: { tag: Array<TTag> }) {
  return (
    <>
      {tag.map(({ title, path }) => (
        <article key={title}>
          <a href={url(path)}>
            <h2>{title}</h2>
          </a>
        </article>
      ))}
    </>
  );
}
