import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: object;
}
const Image = ({ src, alt, width, height, style = {} }: ImageProps) => {
  return <img draggable={false} alt={alt} src={src} style={{ width: `${width}px`, height: `${height}px`, ...style }} />;
};

export default Image;
