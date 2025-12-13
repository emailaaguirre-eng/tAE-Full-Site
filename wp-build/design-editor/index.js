/**
 * WordPress Design Editor Entry Point
 * This builds the Design Editor component for WordPress
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import DesignEditorWP from './DesignEditorWP';
import './styles.css';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('design-editor-root');
  if (container) {
    const productId = container.getAttribute('data-product-id');
    const productType = container.getAttribute('data-product-type') || 'canvas';
    const root = createRoot(container);
    root.render(<DesignEditorWP productId={productId} productType={productType} />);
  }
});

