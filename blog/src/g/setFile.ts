import { getISOTimestampFromDate } from "../utils";

export default function setFile(file: string): [number, string] {
  const now = new Date();

  return [now.getTime(), `${getISOTimestampFromDate(now)}-${file}.mdx`];
}
