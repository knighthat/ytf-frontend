/*
 * Copyright (c) 2024 KnightHat. All Rights Reserved
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {useEffect, useState} from "react";

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