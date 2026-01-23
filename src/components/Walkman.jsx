import { Cassette } from './Cassette';
import { Controls } from './Controls';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import '../styles/walkman.css';

export function Walkman({ playlist }) {
  const {
    isPlaying,
    togglePlay,
    rewind,
    fastForward,
  } = useAudioPlayer(playlist);

  return (
    <div className="walkman">
      <div className="walkman-body">
        <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div>
        <div className="star star-4"></div>
        <div className="star star-5"></div>
        <div className="star star-6"></div>
        <div className="star star-7"></div>
        <div className="star star-8"></div>
        <div className="star star-9"></div>

        <div className="walkman-device">
          <div className="walkman-top-edge"></div>
          <div className="walkman-content">
            <div className="walkman-brand">Música de Julieta</div>

            <div className="walkman-window">
              <Cassette isPlaying={isPlaying} />
            </div>

            <Controls
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              onRewind={rewind}
              onFastForward={fastForward}
            />
          </div>
          <div className="walkman-bottom-edge"></div>
        </div>
      </div>
    </div>
  );
}
