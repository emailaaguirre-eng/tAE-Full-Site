/**
 * WordPress ArtKey Viewer Entry
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import ArtKeyViewerWP from './ArtKeyViewerWP';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('artkey-viewer-root');
  if (!el) return;
  const token = el.getAttribute('data-token') || '';
  const root = createRoot(el);
  root.render(<ArtKeyViewerWP token={token} />);
});

