import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}api/v1/video?page=${page}&limit=10`
        );
        const data = await response.json();
        setVideos(data.data);
        setTotalPages(data.totalVideos / data.rowsPerPage);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      <h2>Video List</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {videos.map((video) => (
          <Link
            to={`/video/${video.videoId}`}
            key={video.videoId}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div style={{ width: "150px", textAlign: "center" }}>
              <img
                src={`${BASE_URL}api/v1/video/thumbnail/${video.videoId}`}
                alt={video.title}
                style={{ width: "100%" }}
              />
              <p>{video.title}</p>
              <p>{video.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <h1> Enjoy! free video streaming </h1>
      <VideoList />
    </>
  );
}

export default Home;
