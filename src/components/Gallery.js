import React from "react";
import Masonry from "react-masonry-component";
import Image from "./Image";
import { composeImgUrl } from "../utils";

export default function Gallery({ imgArray }) {
  return (
    // <div className="gallery">
    <Masonry className="gallery" options={{ fitWidth: true }}>
      {imgArray.map((imgData) => {
        return <Image url={composeImgUrl(imgData)} key={imgData.id} />;
      })}
    </Masonry>
    // </div>
  );
}
