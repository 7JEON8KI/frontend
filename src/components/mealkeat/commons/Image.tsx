import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}
const Image = ({ src, alt, width, height }: ImageProps) => {
  return <img draggable={false} alt={alt} src={src} style={{ width: `${width}px`, height: `${height}px` }} />;
};

export default Image;
