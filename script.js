// =========================================================
// Featured videos
// =========================================================

const featuredVideos = Array.from(
  document.querySelectorAll(".featuredVideo")
);

featuredVideos.forEach((video) => {

  // Pause any other demo video when this one starts playing.
  video.addEventListener("play", () => {
    featuredVideos.forEach((otherVideo) => {
      if (otherVideo !== video && !otherVideo.paused) {
        otherVideo.pause();
      }
    });

    const card = video.closest(".videoCard");
    if (card) {
      card.classList.add("isPlaying");
    }
  });

  // Remove playing state when paused.
  video.addEventListener("pause", () => {
    const card = video.closest(".videoCard");
    if (card) {
      card.classList.remove("isPlaying");
    }
  });

  // Remove playing state when finished.
  video.addEventListener("ended", () => {
    const card = video.closest(".videoCard");
    if (card) {
      card.classList.remove("isPlaying");
    }
  });

  // Helpful debugging if a video cannot load.
  video.addEventListener("error", () => {
    const source = video.querySelector("source");

    console.error(
      "Failed to load video:",
      source ? source.src : "Unknown source",
      video.error
    );
  });

});