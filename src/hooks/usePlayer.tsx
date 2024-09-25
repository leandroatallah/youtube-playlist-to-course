import { useRef, useEffect } from "react";

const SHOULD_USE_CREATE_PLAYER = false;

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}
window.onYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady || {};

export const usePlayer = (
  videoId: string | undefined,
  onFinish: () => void,
) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }

    let timer: NodeJS.Timeout;
    function createPlayer() {
      if (!SHOULD_USE_CREATE_PLAYER) {
        return;
      }

      if (iframeRef.current) {
        const player = new window.YT.Player(iframeRef.current, {
          videoId,
          events: {
            onReady: () => {},
            onError: () => {},
            onStateChange: (e) => {
              if (e.data === 0 && onFinish) {
                onFinish();
              }
            },
          },
        });

        timer = setInterval(() => {
          const currentTime = player.getCurrentTime();
          const duration = player.getDuration();
          const pastTime = (currentTime / duration) * 100;
          console.log(pastTime);
        }, 1000);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [videoId, onFinish]);

  if (!videoId) {
    return {
      iframeRef: null,
    };
  }

  return { iframeRef };
};
