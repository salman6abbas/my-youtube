import { CheckCircle } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { Videos } from ".";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetail(data.items[0]);
    });
    fetchFromAPI(`search?part=snippet&relatedToVideosId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail) return "Loading";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", sm: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://wwww.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" padding={2}>
              {videoDetail?.snippet?.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff", py: 1, px: 2 }}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ xs: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                </Typography>
                <CheckCircle
                  sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                />
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                {" "}
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} views
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
