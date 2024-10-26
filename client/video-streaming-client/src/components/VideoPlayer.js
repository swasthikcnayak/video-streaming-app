import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../config";

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    setVideo(`${BASE_URL}api/v1/video/stream/${id}`);
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div>
      <h2>{video.title}</h2>
      <video controls width="640" height="360">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>
        <Link to="/">Back to Video List</Link>
      </div>
    </div>
  );
}

export default VideoPlayer;
