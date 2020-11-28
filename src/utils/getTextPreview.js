export default function(str) {
  let slicedText = str.slice(0,140).trim();
  let len = slicedText.length;

  if (len > 139) {
    return `${slicedText}...`;
  }
  return slicedText;
}