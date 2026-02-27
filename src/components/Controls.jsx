import '../styles/controls.css';

export function Controls({ isPlaying, mode, onTogglePlay, onRewind, onFastForward }) {
  return (
    <div className="controls">
      <button
        className={`control-btn btn-rewind ${mode === 'rewinding' ? 'active' : ''}`}
        onClick={onRewind}
      >
        <span className="btn-icon">◀◀</span>
      </button>
      <button
        className={`control-btn btn-play ${isPlaying ? 'playing' : ''}`}
        onClick={onTogglePlay}
      >
        <span className="btn-icon">{isPlaying ? '❚❚' : '▶'}</span>
      </button>
      <button
        className={`control-btn btn-forward ${mode === 'forwarding' ? 'active' : ''}`}
        onClick={onFastForward}
      >
        <span className="btn-icon">▶▶</span>
      </button>
    </div>
  );
}
