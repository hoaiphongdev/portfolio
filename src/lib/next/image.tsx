import type { ImageProps } from 'next/image';
import NextImage from 'next/image';

const Image = ({ src, alt, loader, quality = 90, ...otherProps }: ImageProps) => {
  return <NextImage loader={loader} src={src} alt={alt} quality={quality} {...otherProps} />;
};

export default Image;
