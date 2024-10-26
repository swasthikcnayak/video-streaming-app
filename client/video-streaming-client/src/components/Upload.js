import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { AuthContext } from "../AuthContext";
import { BASE_URL } from "../config";

function UploadForm() {
  const { user, token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("video", video);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch(BASE_URL + "api/v1/video/upload", {
        method: "POST",
        headers: {
          "x-access-token": token,
        },
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Upload success");
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error uploading: ", error);
      setError("Upload failed, please retry");
    }
  };

  if (!user) {
    return (
      <>
        <p className="message">Please login to be able to upload video</p>
      </>
    );
  }
  return (
    <div className="login-page">
      <div className="form">
        <h2 className="header">Upload new video</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          Thumbnail :{" "}
          <input
            type="file"
            placeholder="thumbnail"
            onChange={handleThumbnailChange}
            accept=".png, .jpeg, .jpg, 'webp"
            required
          />
          Video :{" "}
          <input
            type="file"
            placeholder="video"
            onChange={handleVideoChange}
            accept=".mp4, .webm, .m4v, .mov"
            required
          />
          <button type="submit">submit</button>
          {error && (
            <p className="message" style={{ color: "red" }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default UploadForm;
