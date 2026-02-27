import { useState, useEffect, useCallback, useRef } from 'react';

// Tiempos de enredo: primero forzado a 5s, luego 10s inactivo, luego 40s inactivo
const TIMEOUTS = [5000, 10000, 40000];

export function useInactivityDetector() {
  const [isTangled, setIsTangled] = useState(false);
  const timeoutRef = useRef(null);
  const tangleCountRef = useRef(0); // cuántas veces se enredó

  const getTimeout = () => {
    const index = Math.min(tangleCountRef.current, TIMEOUTS.length - 1);
    return TIMEOUTS[index];
  };

  const isFirstTangle = () => tangleCountRef.current === 0;

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!isTangled) {
      timeoutRef.current = setTimeout(() => {
        setIsTangled(true);
      }, getTimeout());
    }
  }, [isTangled]);

  const untangle = useCallback(() => {
    tangleCountRef.current += 1;
    setIsTangled(false);
    setTimeout(() => {
      resetTimer();
    }, 100);
  }, [resetTimer]);

  // Configurar event listeners para detectar actividad
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'click'];

    const handleActivity = () => {
      // El primer enredo es forzado (no se resetea con actividad)
      if (!isTangled && !isFirstTangle()) {
        resetTimer();
      }
    };

    // Iniciar el timer al montar
    resetTimer();

    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [isTangled, resetTimer]);

  return {
    isTangled,
    untangle,
    resetTimer,
  };
}
