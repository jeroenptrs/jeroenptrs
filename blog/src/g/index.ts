import meow from "meow";

import askTitle from "./askTitle";
import askFile from "./askFile";
import setFile from "./setFile";
import askTags from "./askTags";
import askAuthors from "./askAuthors";
import type { TMetadata } from "../types";
import gNewMdx from "./gNewMdx";
import selectFile from "./selectFile";
import gPublishMdx from "./gPublishMdx";
import askUpdateChoices from "./askUpdateChoices";
import gUpdateMdx from "./gUpdateMdx";

const cli = meow(
  `
  Usage
  > pnpm run blog g

  Options
  --title, -t     Set article title
  --file, -f      Set article filename
  --tags, -s      Set article tags (non-destructive, comma separated list)
  --update, -u    Update existing article
  --publish, -p   Publish existing article
`,
  {
    importMeta: import.meta,
    flags: {
      title: {
        shortFlag: "t",
        type: "string",
      },
      file: {
        shortFlag: "f",
        type: "string",
      },
      tags: {
        shortFlag: "s",
        type: "string",
      },
      authors: {
        shortFlag: "a",
        type: "string",
      },
      publish: {
        shortFlag: "p",
        type: "boolean",
      },
      update: {
        shortFlag: "u",
        type: "boolean",
      },
    },
  },
);

const { update, publish, ...restFlags } = cli.flags;

async function g() {
  if (update) {
    /**
     * List files or if --file is passed, use that one (if bogus file, fall back on list)
     * Ask what to update (title, file, tags, authors -> use checkboxes)
     */
    const file = await selectFile(restFlags);
    const updateChoices = await askUpdateChoices(restFlags);
    await gUpdateMdx(file, restFlags, updateChoices);
  } else if (publish) {
    /**
     * List files or if --file is passed, use that one (if bogus file, fall back on list)
     * Add published to metadata
     */
    const file = await selectFile(restFlags);
    await gPublishMdx(file);
  } else {
    /**
     * Ask for title (unless --title is passed, skip to next step)
     * Ask for file name, give a default option but allow to overwrite (unless --file is passed, skip to next)
     * Ask for tags, give by default an empty array, input should be a comma separated list (unless --tags is passed, skip to next)
     * Ask for authors, give by default AUTHOR_DEFAULT, input should be a comma separated list (unless --authors is passed, skip to next)
     * Generate boilerplate file to entries/{filename}.mdx
     * Add title to title
     * Add tags to tags
     * Add created and authors to metadata
     * Done
     */
    const title = await askTitle(restFlags);
    const _file = await askFile(restFlags, title);
    const tags = await askTags(restFlags);
    const authors = await askAuthors(restFlags);

    const [created, file] = setFile(_file);
    const metadata: TMetadata = { created, authors };
    await gNewMdx(file, title, JSON.stringify(tags), JSON.stringify(metadata));
  }
}

g();
