import React, {useEffect, useState} from "react";

import '../../assets/css/preview-card.css'

import {VideoPreviewCard} from "../../api/v1/PreviewCard";
import {PopularVideos} from "../../api/v1/backend";

export default function PopularFeed() {
  const [videos, setVideos] = useState<VideoPreviewCard[]>([]);
  useEffect(() => {
    const getVideos = async () => setVideos(await PopularVideos());
    getVideos();
  }, []);

  return (
      <div id='trending-feed' className={"pure-g"}>
        {videos.map((card, index) => <React.Fragment key={index}>{card.toHtml()}</React.Fragment>)}
      </div>
  )
}