import { useState, useEffect, useCallback } from 'react';
import '../styles/tapeTangle.css';

// Número de nudos a desenredar
const TOTAL_KNOTS = 5;

export function TapeTangle({ onUntangle }) {
  const [knots, setKnots] = useState([]);
  const [untangledCount, setUntangledCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Generar nudos aleatorios al montar
  useEffect(() => {
    const generatedKnots = Array.from({ length: TOTAL_KNOTS }, (_, i) => ({
      id: i,
      x: 15 + Math.random() * 70, // porcentaje
      y: 20 + Math.random() * 60,
      rotation: Math.random() * 360,
      size: 0.8 + Math.random() * 0.4,
      untangled: false,
    }));
    setKnots(generatedKnots);
  }, []);

  const handleKnotClick = useCallback((knotId) => {
    setKnots(prev => prev.map(knot =>
      knot.id === knotId ? { ...knot, untangled: true } : knot
    ));
    setUntangledCount(prev => {
      const newCount = prev + 1;
      if (newCount >= TOTAL_KNOTS) {
        setIsComplete(true);
        setShowSuccess(true);
        // Dar tiempo para ver la animación de éxito
        setTimeout(() => {
          onUntangle();
        }, 1500);
      }
      return newCount;
    });
  }, [onUntangle]);

  const progress = (untangledCount / TOTAL_KNOTS) * 100;

  return (
    <div className="tangle-overlay">
      <div className="tangle-modal">
        <div className="tangle-header">
          <span className="tangle-icon">📼</span>
          <h2 className="tangle-title">Se enredó la cinta!</h2>
          <p className="tangle-subtitle">
            Tocá los nudos para desenredarla
          </p>
        </div>

        <div className="tangle-game-area">
          {/* Cassette visual con cinta enredada */}
          <div className="tangled-cassette">
            <div className="tangled-spool tangled-spool-left">
              <div className="spool-inner"></div>
            </div>
            <div className="tangled-spool tangled-spool-right">
              <div className="spool-inner"></div>
            </div>

            {/* Cinta enredada base */}
            <svg className="tape-mess" viewBox="0 0 200 120">
              <path
                className={`tape-path-tangled ${isComplete ? 'untangled' : ''}`}
                d="M30,60 Q50,20 70,60 Q90,100 110,60 Q130,20 150,60 Q170,100 190,60
                   M30,60 Q45,80 60,40 Q80,70 100,50 Q120,80 140,45 Q160,70 180,55
                   M25,55 Q55,30 85,70 Q115,30 145,70 Q175,40 195,65"
                fill="none"
                stroke="var(--barbie-fucsia-dark)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Cinta desenredada (se muestra al completar) */}
              <path
                className={`tape-path-clean ${isComplete ? 'visible' : ''}`}
                d="M30,60 L170,60"
                fill="none"
                stroke="var(--barbie-fucsia-dark)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

            {/* Nudos clickeables */}
            {knots.map(knot => (
              <button
                key={knot.id}
                className={`knot ${knot.untangled ? 'untangled' : ''}`}
                style={{
                  left: `${knot.x}%`,
                  top: `${knot.y}%`,
                  transform: `translate(-50%, -50%) rotate(${knot.rotation}deg) scale(${knot.size})`,
                }}
                onClick={() => !knot.untangled && handleKnotClick(knot.id)}
                disabled={knot.untangled}
                aria-label={`Nudo ${knot.id + 1}`}
              >
                <span className="knot-icon">🎀</span>
              </button>
            ))}
          </div>

          {/* Barra de progreso */}
          <div className="tangle-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="progress-text">
              {untangledCount} / {TOTAL_KNOTS} nudos
            </span>
          </div>
        </div>

        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="success-message">
            <span className="success-stars">✨</span>
            <span className="success-text">Listo!</span>
            <span className="success-stars">✨</span>
          </div>
        )}

        <div className="tangle-hint">
          <span>💡</span> No dejes el walkman sin usar mucho tiempo!
        </div>
      </div>
    </div>
  );
}
