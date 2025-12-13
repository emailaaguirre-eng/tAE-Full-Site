/**
 * WordPress ArtKey Editor Entry Point
 * This builds the ArtKey Editor component for WordPress
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import ArtKeyEditorWP from './ArtKeyEditorWP';
import './styles.css';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('artkey-editor-root');
  if (container) {
    const artkeyId = container.getAttribute('data-artkey-id');
    const root = createRoot(container);
    root.render(<ArtKeyEditorWP artkeyId={artkeyId} />);
  }
});

