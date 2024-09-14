export const isValidYouTubePlaylistURL = (value: string) => {
  try {
    const url = new URL(value);

    if (url.hostname !== "www.youtube.com" && url.hostname !== "youtube.com") {
      return false;
    }

    if (url.pathname !== "/playlist") {
      return false;
    }

    return url.searchParams.has("list");
  } catch (err) {
    // If it fails, it means the value is not a valid URL or doesn't match the expected pattern
    return false;
  }
};
