export default function extractFileName(file: string): string {
  return file.substring(9, file.length - 4);
}
