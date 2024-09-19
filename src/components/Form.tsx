"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { fetchYoutubePlaylistAndItems } from "@/services/youtube-data-api";
import { isValidYouTubePlaylistURL } from "@/utils/validate-url";
import { createCourse } from "@/services/course.crud";
import { CoursePayload } from "@/models/course.model";
import { Button } from "./Button";

export const Form = () => {
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

    const coursePayload: CoursePayload =
      await fetchYoutubePlaylistAndItems(playlistId);

    const result = createCourse(coursePayload);
    if (result) {
      router.push("/courses");
    }

    setIsLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <input
        value={inputValue}
        type="url"
        placeholder="Cole uma URL de uma playlist do Youtube"
        onInput={handleOnInput}
        style={{
          height: 48,
          border: "2px solid var(--primary)",
          borderRadius: 4,
          padding: "0 10px",
        }}
      />
      <Button
        disabled={isButtonDisabled}
        onClick={handleOnSubmit}
        style={{
          height: 48,
          fontSize: 16,
        }}
      >
        {isLoading ? "Carregando" : "Criar curso"}
      </Button>
    </div>
  );
};
