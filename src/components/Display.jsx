import '../styles/display.css';

export function Display({ track, trackNumber, totalTracks }) {
  const displayText = `${track.artist} - ${track.title}`;

  return (
    <div className="display">
      <div className="display-screen">
        <div className="display-track-number">
          {String(trackNumber).padStart(2, '0')}/{String(totalTracks).padStart(2, '0')}
        </div>
        <div className="display-text-container">
          <span className="display-text">{displayText}</span>
        </div>
      </div>
    </div>
  );
}
