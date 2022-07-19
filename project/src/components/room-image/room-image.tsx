type RoomImageProps = {
  src: string;
};

export default function RoomImage(props: RoomImageProps): JSX.Element {
  const { src } = props;

  return (
    <div className='property__image-wrapper'>
      <img className='property__image' src={src} alt='view' />
    </div>
  );
}
