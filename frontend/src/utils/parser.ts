export function parseDataUrlToEncodedData(dataUrl: string) {
  const partition = dataUrl.split(",");
  const encodedData = partition?.[1];
  return encodedData ?? "";
}
