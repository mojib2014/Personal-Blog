export default function getReadingTime(body) {
  const wpm = 255;
  const words = body.split(/\s+/).length;
  const readingTime = Math.ceil(words / wpm);

  return readingTime > 1
    ? readingTime + " Mins Read"
    : readingTime + " Min Read";
}
