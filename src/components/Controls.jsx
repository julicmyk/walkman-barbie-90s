import '../styles/controls.css';

export function Controls({ isPlaying, onTogglePlay, onRewind, onFastForward }) {
  return (
    <div className="controls">
      <button className="control-btn btn-rewind" onClick={onRewind}>
        <span className="btn-icon">◀◀</span>
      </button>
      <button
        className={`control-btn btn-play ${isPlaying ? 'playing' : ''}`}
        onClick={onTogglePlay}
      >
        <span className="btn-icon">{isPlaying ? '❚❚' : '▶'}</span>
      </button>
      <button className="control-btn btn-forward" onClick={onFastForward}>
        <span className="btn-icon">▶▶</span>
      </button>
    </div>
  );
}
