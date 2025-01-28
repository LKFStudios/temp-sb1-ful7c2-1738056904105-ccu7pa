import React, { useEffect, useRef } from 'react';
import { useGender } from '../../../context/GenderContext';
import { RadarChartProps } from './types';
import { CATEGORY_LABELS, CHART_CONFIG } from './constants';
import { calculateChartPoints, normalizeScore } from './utils';

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
    const radius = (size / 2) * 0.5;
    const categories = ['eyes', 'nose', 'skin', 'jawline', 'hair'] as const;
    const labels = CATEGORY_LABELS[gender];

    // Draw background grid
    for (let i = CHART_CONFIG.LEVELS; i > 0; i--) {
      const ratio = i / CHART_CONFIG.LEVELS;
      const points = calculateChartPoints(centerX, centerY, radius * ratio, categories as unknown as string[]);
      
      ctx.beginPath();
      points.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.closePath();
      ctx.strokeStyle = 'rgba(229, 231, 235, 0.5)';
      ctx.stroke();
      ctx.fillStyle = 'rgba(249, 250, 251, 0.5)';
      ctx.fill();
    }

    // Draw data area
    ctx.beginPath();
    categories.forEach((category, index) => {
      const score = normalizeScore(scores[category]);
      const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
      const x = centerX + radius * score * Math.cos(angle);
      const y = centerY + radius * score * Math.sin(angle);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
    ctx.fill();
    ctx.strokeStyle = 'rgb(34, 197, 94)';
    ctx.lineWidth = CHART_CONFIG.LINE_WIDTH;
    ctx.stroke();

    // Draw data points
    categories.forEach((category, index) => {
      const score = normalizeScore(scores[category]);
      const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
      const x = centerX + radius * score * Math.cos(angle);
      const y = centerY + radius * score * Math.sin(angle);
      
      ctx.beginPath();
      ctx.arc(x, y, CHART_CONFIG.POINT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = 'rgb(34, 197, 94)';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = CHART_CONFIG.LINE_WIDTH;
      ctx.stroke();
    });

    // Draw labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    categories.forEach((category, index) => {
      const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
      const labelRadius = radius * CHART_CONFIG.LABEL_DISTANCE;
      const x = centerX + labelRadius * Math.cos(angle);
      const y = centerY + labelRadius * Math.sin(angle);
      
      const label = labels[category];
      const score = Math.round(scores[category]);
      
      // Draw label background
      const labelMetrics = ctx.measureText(label);
      const scoreMetrics = ctx.measureText(score.toString());
      const maxWidth = Math.max(labelMetrics.width, scoreMetrics.width);
      const padding = 10;
      const boxHeight = 45;
      
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
      
      // Draw category label
      ctx.font = 'bold 16px sans-serif';
      ctx.fillStyle = '#374151';
      ctx.fillText(label, x, y - 10);
      
      // Draw score
      ctx.font = '15px sans-serif';
      ctx.fillStyle = '#059669';
      ctx.fillText(score.toString(), x, y + 10);
    });
  }, [scores, size, gender]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className} max-w-full h-auto`}
    />
  );
}