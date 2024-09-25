[1mdiff --git a/src/components/VideoDetail/index.tsx b/src/components/VideoDetail/index.tsx[m
[1mindex a156900..4612252 100644[m
[1m--- a/src/components/VideoDetail/index.tsx[m
[1m+++ b/src/components/VideoDetail/index.tsx[m
[36m@@ -29,6 +29,7 @@[m [mconst VideoDetail = ({ course, onFinish }: VideoDetailProps) => {[m
   const [showNextLessonDialog, setShowNextLessonDialog] = useState(false);[m
 [m
   function handleOnFinish() {[m
[32m+[m[32m    console.log("currentLesson", currentLesson);[m
     if (currentLesson) {[m
       setShowNextLessonDialog(true);[m
       setLessonAsDone(course.id, currentLesson.id);[m
[1mdiff --git a/src/hooks/usePlayer.tsx b/src/hooks/usePlayer.tsx[m
[1mindex 9bdfe50..e024553 100644[m
[1m--- a/src/hooks/usePlayer.tsx[m
[1m+++ b/src/hooks/usePlayer.tsx[m
[36m@@ -1,7 +1,5 @@[m
 import { useRef, useEffect } from "react";[m
 [m
[31m-const SHOULD_USE_CREATE_PLAYER = false;[m
[31m-[m
 declare global {[m
   interface Window {[m
     onYouTubeIframeAPIReady: () => void;[m
[36m@@ -16,6 +14,8 @@[m [mexport const usePlayer = ([m
   const iframeRef = useRef<HTMLIFrameElement>(null);[m
 [m
   useEffect(() => {[m
[32m+[m[32m    let timer: NodeJS.Timeout;[m
[32m+[m
     if (!window.YT) {[m
       const tag = document.createElement("script");[m
       tag.src = "https://www.youtube.com/iframe_api";[m
[36m@@ -28,12 +28,7 @@[m [mexport const usePlayer = ([m
       createPlayer();[m
     }[m
 [m
[31m-    let timer: NodeJS.Timeout;[m
     function createPlayer() {[m
[31m-      if (!SHOULD_USE_CREATE_PLAYER) {[m
[31m-        return;[m
[31m-      }[m
[31m-[m
       if (iframeRef.current) {[m
         const player = new window.YT.Player(iframeRef.current, {[m
           videoId,[m
[36m@@ -41,6 +36,7 @@[m [mexport const usePlayer = ([m
             onReady: () => {},[m
             onError: () => {},[m
             onStateChange: (e) => {[m
[32m+[m[32m              console.log(e);[m
               if (e.data === 0 && onFinish) {[m
                 onFinish();[m
               }[m
[36m@@ -49,6 +45,10 @@[m [mexport const usePlayer = ([m
         });[m
 [m
         timer = setInterval(() => {[m
[32m+[m[32m          if (!player) {[m
[32m+[m[32m            return;[m
[32m+[m[32m          }[m
[32m+[m
           const currentTime = player.getCurrentTime();[m
           const duration = player.getDuration();[m
           const pastTime = (currentTime / duration) * 100;[m
