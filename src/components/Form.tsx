"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  fetchPlaylistItems,
  fetchYouTubePlaylist,
} from "@/services/youtube-data-api";
import { isValidYouTubePlaylistURL } from "@/utils/validate-url";
import { createCourse } from "@/services/course.crud";
import { CoursePayload } from "@/models/course.model";

const Form = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isUrlValid = isValidYouTubePlaylistURL(inputValue);
  const isButtonDisabled = isLoading || !isUrlValid;

  const handleOnInput = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInputValue(value);
  };

  const handleOnSubmit = async () => {
    if (!isUrlValid) {
      return;
    }

    const urlObj = new URL(inputValue);
    const playlistId = urlObj.searchParams.get("list");

    if (!playlistId) {
      return;
    }

    setIsLoading(true);

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
      lessons: playlistItems.map((item) => ({
        title: item.title,
        videoId: item.videoId,
        thumbnailUrl: item.thumbnailUrl,
      })),
    };

    const result = createCourse(coursePayload);
    if (result) {
      router.push("/courses");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <input
        value={inputValue}
        type="url"
        placeholder="Cole uma URL de uma playlist do Youtube"
        onInput={handleOnInput}
      />
      <button
        type="button"
        disabled={isButtonDisabled}
        onClick={handleOnSubmit}
      >
        {isLoading ? "Carregando" : "Criar curso"}
      </button>
    </div>
  );
};

export default Form;
