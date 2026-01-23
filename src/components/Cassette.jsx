import '../styles/cassette.css';

export function Cassette({ isPlaying }) {
  return (
    <div className="cassette">
      <div className="cassette-body">
        <div className="cassette-label">
          <span className="cassette-brand">Dream</span>
          <span className="cassette-type">POP</span>
        </div>
        <div className="cassette-window">
          <div className={`spool spool-left ${isPlaying ? 'spinning' : ''}`}>
            <div className="spool-center"></div>
            <div className="spool-spoke"></div>
            <div className="spool-spoke spoke-2"></div>
            <div className="spool-spoke spoke-3"></div>
          </div>
          <div className="tape-path">
            <div className="tape-line"></div>
          </div>
          <div className={`spool spool-right ${isPlaying ? 'spinning' : ''}`}>
            <div className="spool-center"></div>
            <div className="spool-spoke"></div>
            <div className="spool-spoke spoke-2"></div>
            <div className="spool-spoke spoke-3"></div>
          </div>
        </div>
        <div className="cassette-holes">
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
        </div>
      </div>
    </div>
  );
}
