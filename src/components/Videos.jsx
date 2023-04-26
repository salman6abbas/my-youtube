import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ChannelCard, VideoCard } from "./";

const Videos = ({ videos, direction }) => {
  console.log("videos", videos);
  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      gap={2}
    >
      {videos.map((item) => (
        <Box>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
