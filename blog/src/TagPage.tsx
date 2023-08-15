import type { TTag } from "./types";

const url = (path: string) => `https://jeroenpeeters.be/${path}`;

export default function TagPage({ tag }: { tag: Array<TTag> }) {
  return (
    <>
      {tag.map(({ title, path }) => (
        <article key={title}>
          <a href={url(path)}>
            <h1>{title}</h1>
          </a>
        </article>
      ))}
    </>
  );
}
