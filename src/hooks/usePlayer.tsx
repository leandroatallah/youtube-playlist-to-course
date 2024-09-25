import { useRef, useEffect } from "react";

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
    let timer: NodeJS.Timeout;

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

    function createPlayer() {
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
          if (!player?.getDuration) {
            return;
          }

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
