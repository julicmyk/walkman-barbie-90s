import { useState, useEffect, useCallback, useRef } from 'react';

// Tiempo de inactividad antes de que la cinta se enrede (en ms)
const INACTIVITY_TIMEOUT = 30000; // 30 segundos para testing (cambiar a más tiempo en producción)

export function useInactivityDetector() {
  const [isTangled, setIsTangled] = useState(false);
  const timeoutRef = useRef(null);
  const lastActivityRef = useRef(Date.now());

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Solo iniciar el timer si no está enredado
    if (!isTangled) {
      timeoutRef.current = setTimeout(() => {
        setIsTangled(true);
      }, INACTIVITY_TIMEOUT);
    }
  }, [isTangled]);

  const untangle = useCallback(() => {
    setIsTangled(false);
    // Reiniciar el timer después de desenredar
    setTimeout(() => {
      resetTimer();
    }, 100);
  }, [resetTimer]);

  // Configurar event listeners para detectar actividad
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'click'];

    const handleActivity = () => {
      if (!isTangled) {
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
