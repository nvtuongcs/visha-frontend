import React, { useState, useEffect } from "react";
import StyledVideoList from "../styles/StyledVideoList";
import Video from "../components/Video";
import useVideosApis from "../hooks/useVideosApis";

const Videos = () => {
  const { total, page, setPage, videos, isLoading } = useVideosApis();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function handleScroll() {
    const list = document.getElementById("list");
    if (
      window.innerHeight + window.scrollY ===
      list.clientHeight + list.offsetTop
    ) {
      if (!isLoading) {
        page + 1 <= total && setPage(page + 1);
      }
    }
  }

  return (
    <StyledVideoList>
      <div id="list" style={{ height: "100%" }}>
        {videos.map(video => (
          <Video key={video.id} {...video} />
        ))}
      </div>
    </StyledVideoList>
  );
};

export default Videos;
