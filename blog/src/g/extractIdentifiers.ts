export function extractIdentifiers(source: string): [string, string, string] {
  const TITLE = "export const title = ";
  const TAGS = "export const tags = ";
  const METADATA = "export const metadata = ";

  const titleIndex = source.indexOf(TITLE) + TITLE.length;
  const tagsIndex = source.indexOf(TAGS) + TAGS.length;
  const metadataIndex = source.indexOf(METADATA) + METADATA.length;

  const title = source.substring(
    titleIndex,
    source.indexOf("\n", titleIndex) - 1,
  );
  const tags = source.substring(tagsIndex, source.indexOf("\n", tagsIndex) - 1);
  const metadata = source.substring(
    metadataIndex,
    source.indexOf("\n", metadataIndex) - 1,
  );

  return [
    title,
    tags,
    metadata,
  ];
}
