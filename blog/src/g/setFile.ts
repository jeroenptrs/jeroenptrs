import { getISOTimestampFromDate } from "../utils";

export default function setFile(file: string, _now?: Date): [number, string] {
  const now = _now ?? new Date();

  return [now.getTime(), `${getISOTimestampFromDate(now)}-${file}.mdx`];
}
