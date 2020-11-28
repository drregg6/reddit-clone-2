export default function(url) {
  const lastForwardSlash = url.lastIndexOf('/');
  if (lastForwardSlash === -1) throw Error;
  let endpoint;
  let partialUrl = url.slice(lastForwardSlash + 1);
  if (partialUrl.indexOf('?') !== -1) {
    endpoint = partialUrl.indexOf('?');
    return partialUrl.slice(0, endpoint);
  }
  return partialUrl;
}