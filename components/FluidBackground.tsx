/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';

const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawBlob = (
      x: number,
      y: number,
      radius: number,
      color: string,
      phase: number
    ) => {
      ctx.beginPath();
      const points = 6;
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const r = radius + Math.sin(angle * 3 + phase) * radius * 0.3;
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const animate = () => {
      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      drawBlob(
        cx + Math.sin(time * 0.7) * 200,
        cy + Math.cos(time * 0.5) * 150,
        250,
        'rgba(16, 185, 129, 0.04)',
        time
      );

      drawBlob(
        cx + Math.cos(time * 0.6) * 300,
        cy + Math.sin(time * 0.4) * 200,
        300,
        'rgba(16, 185, 129, 0.03)',
        time * 1.3
      );

      drawBlob(
        cx + Math.sin(time * 0.8) * 150,
        cy + Math.cos(time * 0.7) * 250,
        200,
        'rgba(255, 255, 255, 0.02)',
        time * 0.8
      );

      ctx.globalCompositeOperation = 'source-over';
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#050505' }}
    />
  );
};

export default FluidBackground;
