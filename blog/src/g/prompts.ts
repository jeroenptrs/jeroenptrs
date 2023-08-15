import type { ListQuestion, Question } from "inquirer";

import { AUTHOR_DEFAULT } from "../constants";

export const title: Question = {
  name: "title",
  message: "What is the article's title?",
};

export const file = (d: string): Question => ({
  name: "file",
  message: "What is the article's file name? [Don't add a date]",
  default: d,
});

export const selectFile = (choices: string[]): ListQuestion => ({
  name: "selectFile",
  type: "list",
  choices,
  pageSize: 10,
  message: "Select the file you want to update",
});

export const newTags: Question = {
  name: "tags",
  message: "What are some tags for this article?",
};

export const authors = (d: string[] = AUTHOR_DEFAULT): Question => ({
  name: "authors",
  message: "What author(s) wrote this article?",
  default: d.join(", "),
});
