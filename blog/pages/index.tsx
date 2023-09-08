import { TData } from "../src/types";

export default function Index({ pages }: { pages: TData["pages"] }) {
  return (
    <>
      {pages.map(({ title, file, metadata }) => (
        <article key={file}>
          <hgroup>
            <a href={`/${file}`}>
              <h1>{title}</h1>
            </a>
            <h4>Written on {metadata.published ?? metadata.created}</h4>
          </hgroup>
        </article>
      ))}
    </>
  );
}
