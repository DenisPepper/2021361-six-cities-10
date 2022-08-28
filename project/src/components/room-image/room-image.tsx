import { memo } from 'react';

type RoomImageProps = {
  src: string;
};

function RoomImage(props: RoomImageProps): JSX.Element {
  const { src } = props;

  return (
    <div className='property__image-wrapper'>
      <img className='property__image' src={src} alt='view' />
    </div>
  );
}

export default memo(RoomImage, (src, prevSrc) => src === prevSrc);
