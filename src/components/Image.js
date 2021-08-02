import React from "react";

export default function Image({ url }) {
  return (
    <div>
      <img className="gallery__image" src={url} alt="" width="320" />
    </div>
  );
}
