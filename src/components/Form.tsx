import { FormEvent, useState } from "react";

import { fetchYoutubePlaylistAndItems } from "@/services/youtube-data-api";
import { isValidYouTubePlaylistURL } from "@/utils/validate-url";
import { createCourse } from "@/services/course.crud";
import { useToast } from "@/context/ToastContext";

import { Button } from "./Button";

type FormProps = { onSuccess: () => void };

export const Form = ({ onSuccess }: FormProps) => {
  const { toast } = useToast();

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

    const coursePayload = await fetchYoutubePlaylistAndItems(playlistId);

    if (!coursePayload) {
      setIsLoading(false);
      toast.error();
      return;
    }

    const result = createCourse(coursePayload);
    if (result.status === 409) {
      setIsLoading(false);
      toast.error("Este curso já está em seu catálogo.");
      return;
    }

    if (result.status === 400) {
      setIsLoading(false);
      toast.error();
      return;
    }

    onSuccess();
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
