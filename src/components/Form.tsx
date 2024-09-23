import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  errorMessage,
  fetchYoutubePlaylistAndItems,
} from "@/services/youtube-data-api";
import { isValidYouTubePlaylistURL } from "@/utils/validate-url";
import { createCourse } from "@/services/course.crud";
import { useToast } from "@/context/ToastContext";

import { Button } from "./Button";

type FormProps = { onSuccess: () => void };

export const Form = ({ onSuccess }: FormProps) => {
  const { toast } = useToast();

  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInputError, setShowInputError] = useState(false);

  const isUrlValid = isValidYouTubePlaylistURL(inputValue);
  const isButtonDisabled = isLoading || !isUrlValid;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (inputValue.length && !isUrlValid) {
      timer = setTimeout(() => {
        setShowInputError(true);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
      setShowInputError(false);
    };
  }, [inputValue]);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

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

    if (coursePayload instanceof Error) {
      setIsLoading(false);
      toast.error(errorMessage[coursePayload.message]);
      return;
    }

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
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <input
        ref={inputRef}
        value={inputValue}
        type="url"
        placeholder="Cole uma URL de uma playlist do Youtube"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleOnSubmit();
          }
        }}
        onInput={handleOnInput}
        style={{
          height: 48,
          border: "2px solid var(--primary)",
          borderRadius: 4,
          padding: "0 10px",
          outline: 0,
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
      {showInputError && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 10,
            fontSize: 12,
            color: "#e33",
            textAlign: "center",
          }}
        >
          Insira uma URL de playlist válida.
        </div>
      )}
    </div>
  );
};
