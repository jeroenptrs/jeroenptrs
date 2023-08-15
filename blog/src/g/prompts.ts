import type { CheckboxQuestion, ListQuestion, Question } from "inquirer";

import { AUTHOR_DEFAULT } from "../constants";
import { TFlags } from "../types";

export const title = (oldTitle?: string): Question => ({
  name: "title",
  message: "What is the article's title?",
  default: oldTitle,
});

export const file = (d: string): Question => ({
  name: "file",
  message: "What is the article's file name? [Don't add a date]",
  default: d,
});

export const selectFile = (
  choices: string[],
  isUpdate?: boolean,
): ListQuestion => ({
  name: "selectFile",
  type: "list",
  choices,
  pageSize: 10,
  message: `Select the file you want to ${isUpdate ? "update" : "publish"}`,
});

export const tags: Question = {
  name: "tags",
  message:
    "What are some tags for this article? They will be added to the previous ones.",
};

export const authors = (d: string[] = AUTHOR_DEFAULT): Question => ({
  name: "authors",
  message: "What author(s) wrote this article?",
  default: d.join(", "),
});

export const updateChoices = (restFlags: TFlags): CheckboxQuestion => ({
  name: "updateChoices",
  type: "checkbox",
  message: "What do you want to update?",
  choices: [{
    name: "title",
    value: "title",
    disabled: !!restFlags.title && "You already provided update data",
  }, {
    name: "file",
    value: "file",
    disabled: !!restFlags.file && "You already provided update data",
  }, {
    name: "tags",
    value: "tags",
    disabled: !!restFlags.tags && "You already provided update data",
  }, {
    name: "authors",
    value: "authors",
    disabled: !!restFlags.authors && "You already provided update data",
  }],
});
