import React, { useEffect, useRef } from 'react';
import { useGender } from '../../context/GenderContext';

interface RadarChartProps {
  scores: {
    eyes: number;
    nose: number;
    skin: number;
    jawline: number;
    hair: number;
  };
  size?: number;
  className?: string;
}

export function RadarChart({ scores, size = 300, className = '' }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { gender } = useGender();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Configuration
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size / 2) * 0.5; // Reduced radius for more label space
    const categories = ['eyes', 'nose', 'skin', 'jawline', 'hair'] as const;
    const categoryLabels = gender === 'female' ? {
      eyes: '目元',
      nose: '鼻筋',
      skin: '肌質',
      jawline: '輪郭',
      hair: '髪型'
    } : {
      eyes: '目',
      nose: '鼻',
      skin: '肌',
      jawline: '輪郭',
      hair: '髪型'
    };

    // Draw background grid
    const levels = 5;
    for (let i = levels; i > 0; i--) {
      const ratio = i / levels;
      ctx.beginPath();
      categories.forEach((_, index) => {
        const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
        const x = centerX + radius * ratio * Math.cos(angle);
        const y = centerY + radius * ratio * Math.sin(angle);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.strokeStyle = 'rgba(229, 231, 235, 0.5)';
      ctx.stroke();
      ctx.fillStyle = 'rgba(249, 250, 251, 0.5)';
      ctx.fill();
    }

    // Draw axes
    categories.forEach((_, index) => {
      const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * Math.cos(angle),
        centerY + radius * Math.sin(angle)
      );
      ctx.strokeStyle = 'rgba(229, 231, 235, 0.8)';
      ctx.stroke();
    });

    // Draw labels with enhanced visibility
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    categories.forEach((category, index) => {
      const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
      const labelRadius = radius * 1.6; // Increased distance for labels
      const x = centerX + labelRadius * Math.cos(angle);
      const y = centerY + labelRadius * Math.sin(angle);
      
      // Draw label background
      const label = categoryLabels[category];
      const score = Math.round(scores[category]);
      const labelMetrics = ctx.measureText(label);
      const scoreMetrics = ctx.measureText(score.toString());
      const maxWidth = Math.max(labelMetrics.width, scoreMetrics.width);
      const padding = 10;
      const boxHeight = 45;
      
      // Enhanced background with rounded corners
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.beginPath();
      ctx.roundRect(
        x - maxWidth/2 - padding,
        y - boxHeight/2,
        maxWidth + padding * 2,
        boxHeight,
        8
      );
      ctx.fill();
      
      // Draw category label with shadow
      ctx.font = 'bold 16px sans-serif';
      ctx.fillStyle = '#374151';
      ctx.fillText(label, x, y - 10);
      
      // Draw score with enhanced visibility
      ctx.font = '15px sans-serif';
      ctx.fillStyle = '#059669';
      ctx.fillText(score.toString(), x, y + 10);
    });

    // Draw data area
    ctx.beginPath();
    categories.forEach((category, index) => {
      const score = scores[category] / 100;
      const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
      const x = centerX + radius * score * Math.cos(angle);
      const y = centerY + radius * score * Math.sin(angle);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
    ctx.fill();
    ctx.strokeStyle = 'rgb(34, 197, 94)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw data points
    categories.forEach((category, index) => {
      const score = scores[category] / 100;
      const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
      const x = centerX + radius * score * Math.cos(angle);
      const y = centerY + radius * score * Math.sin(angle);
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgb(34, 197, 94)';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [scores, size, gender]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className} max-w-full h-auto`}
    />
  );
}