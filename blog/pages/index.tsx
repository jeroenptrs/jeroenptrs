import { readdirSync } from "node:fs";
import { parse, resolve } from "node:path";

import { getFolderPath } from "../src/utils";
import { ARTICLES_FOLDER } from "../src/constants";

const [, ...pageList] = readdirSync(
  resolve(getFolderPath(), ARTICLES_FOLDER),
) as [
  string,
  ...Array<string>,
];

export default function Index() {
  return (
    <>
      {pageList.map(parse).map(({ name }) => (
        <article key={name}>
          <a href={`/entries/${name}.html`}>
            <h1>{name}</h1>
          </a>
        </article>
      ))}
    </>
  );
}
