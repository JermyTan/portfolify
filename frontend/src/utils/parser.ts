export function parseDataUrlToEncodedData(dataUrl: string) {
  const partition = dataUrl.split(",");
  const encodedData = partition?.[1];
  return encodedData ?? "";
}

export function getMimeTypeFromDataUrl(dataUrl: string) {
  return dataUrl.substring(dataUrl.indexOf(":") + 1, dataUrl.indexOf(";"));
}
