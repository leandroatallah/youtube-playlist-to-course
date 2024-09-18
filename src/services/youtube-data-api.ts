import { YOUTUBE_DATA_API_V3_KEY as API_KEY } from "@/constants/config";
import { CoursePayload } from "@/models/course.model";

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

type youtubePlaylistItem = {
  title: string;
  videoId: string;
  thumbnailUrl: string;
};

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
};

export const fetchPlaylistItems = async (playlistId: string) => {
  const url = `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`;
  const response = await fetch(url);
  const data = (await response.json()) as youtubePlaylistItemsResponse;

  if (!data?.items?.length) {
    return [];
  }

  return data.items.map((item) => ({
    title: item.snippet.title,
    videoId: item.snippet.resourceId.videoId,
    thumbnailUrl: item.snippet.thumbnails.default.url,
  }));
};

export const fetchYoutubePlaylistAndItems = async (playlistId: string) => {
  const playlistData = await fetchYouTubePlaylist(playlistId);
  const playlistItems = await fetchPlaylistItems(playlistId);

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
};
