import { YOUTUBE_DATA_API_V3_KEY as API_KEY } from "@/constants";
import { CoursePayload } from "@/models/course.model";
import { Lesson } from "@/models/lesson.model";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

type youtubeThumbnails = {
  default: { url: string };
  medium: { url: string };
  high: { url: string };
  standard: { url: string };
  maxres: { url: string };
};

type youtubePlaylistResponse = {
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  thumbnails: youtubeThumbnails;
};

export const errorMessage: Record<string, string> = {
  "Playlist not found": "A playlist não foi encontrada. Insira uma URL válida.",
};

export const fetchYouTubePlaylist = async (playlistId: string) => {
  const url = `${BASE_URL}/playlists?part=snippet&id=${playlistId}&key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.items.length === 0) {
    throw new Error("Playlist not found");
  }

  const { title, description, channelId, channelTitle, thumbnails } = data
    .items[0].snippet as youtubePlaylistResponse;

  return {
    title,
    description,
    channelTitle,
    channelId,
    playlistId,
    thumbnailUrl: thumbnails.medium.url,
    // videos: await fetchPlaylistItems(playlistId),
  };
};

// type youtubePlaylistItem = {
//   title: string;
//   videoId: string;
//   thumbnailUrl: string;
// };

type youtubePlaylistItemsResponse = {
  items: [
    {
      snippet: {
        title: string;
        resourceId: {
          videoId: string;
        };
        thumbnails: youtubeThumbnails;
      };
    },
  ];
  nextPageToken?: string;
};

export const fetchPlaylistItems = async (
  playlistId: string,
  pageToken: string | null,
) => {
  const pageTokenQuery = pageToken ? `&pageToken=${pageToken}` : "";
  const url = `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}${pageTokenQuery}`;
  const response = await fetch(url);
  const data = (await response.json()) as youtubePlaylistItemsResponse;

  if (!data?.items?.length) {
    return { items: [], nextPageToken: null };
  }

  const items = data.items
    .filter((item) => item.snippet.title !== "Private video")
    .map((item) => {
      console.log(item);
      return {
        title: item.snippet.title,
        videoId: item.snippet.resourceId.videoId,
        thumbnailUrl: item.snippet.thumbnails.default.url,
      };
    });

  return {
    items,
    nextPageToken: data?.nextPageToken || null,
  };
};

export const fetchYoutubePlaylistAndItems = async (
  playlistId: string,
): Promise<CoursePayload | null | Error> => {
  try {
    const playlistData = await fetchYouTubePlaylist(playlistId);
    const playlistItems: Omit<Lesson, "id" | "done">[] = [];

    let shouldFetchItems = true;
    let pageToken: string | null = null;

    while (shouldFetchItems) {
      const { items, nextPageToken } = await fetchPlaylistItems(
        playlistId,
        pageToken,
      );

      if (items?.length) {
        playlistItems.push(...items);
      }

      pageToken = nextPageToken;
      shouldFetchItems = !!nextPageToken;
    }

    const { title, description, channelTitle, channelId, thumbnailUrl } =
      playlistData;

    const coursePayload: CoursePayload = {
      title,
      description,
      channelTitle,
      channelId,
      thumbnailUrl,
      playlistId,
      currentLessonId: null,
      lessons: playlistItems.map((item) => ({
        title: item.title,
        videoId: item.videoId,
        thumbnailUrl: item.thumbnailUrl,
        done: false,
      })),
    };

    return coursePayload;
  } catch (e) {
    console.log(e);
    return e as Error;
  }
};
