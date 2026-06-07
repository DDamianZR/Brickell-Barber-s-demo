/**
 * Web Audio API Haptic Audio Generator
 * Generates soft physical tick and chime sounds directly in the browser.
 */

// Safe check to avoid SSR (Server Side Rendering) issues in Next.js
const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  return AudioContextClass ? new AudioContextClass() : null;
};

export const playHapticClick = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  // Resume if suspended (browser security autoplay policies)
  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(130, ctx.currentTime); // Low physical thud
  osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.035);

  gain.gain.setValueAtTime(0.06, ctx.currentTime); // Very soft volume
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.04);
};

export const playHapticSuccess = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  // Play a soft, beautiful double chime (VIP gold feel)
  const now = ctx.currentTime;
  
  const playTone = (freq: number, start: number, duration: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, start);
    
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.04, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + duration);
  };

  playTone(523.25, now, 0.25); // C5 tone
  playTone(659.25, now + 0.1, 0.35); // E5 tone
};
