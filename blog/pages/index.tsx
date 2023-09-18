import formatDate from "../src/formatDate";
import { TData } from "../src/types";

export default function Index({ pages }: { pages: TData["pages"] }) {
  return (
    <>
      {pages.map(({ title, file, metadata, tags }) => (
        <article key={file}>
          <hgroup>
            <a href={`/${file}`}>
              <h2>{title}</h2>
            </a>
            <h4>
              Written on {formatDate(metadata.published ?? metadata.created)} by
              {" "}
              {metadata.authors.join(", ")}
            </h4>
            <h6>
              {tags.map((tag) => (
                <>
                  <a href={`/tags/${tag}`} className="secondary">#{tag}
                  </a>&nbsp;
                </>
              ))}
            </h6>
          </hgroup>
        </article>
      )).reverse()}
    </>
  );
}
