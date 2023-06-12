import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import IconButton from './IconButton';

const PlayButton = ({
  onClick,
  isPlaying
}: {
  isPlaying: boolean;
  onClick: () => void;
}) => {
  return (
    <>
      {isPlaying ? (
        <IconButton onClick={onClick} icon={faPause} />
      ) : (
        <IconButton onClick={onClick} icon={faPlay} />
      )}
    </>
  );
};

export default PlayButton;
