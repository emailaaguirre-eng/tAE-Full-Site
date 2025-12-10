"use client";

import { Suspense } from 'react';
import ArtKeyEditor from '@/components/ArtKeyEditor';

export default function ArtKeyEditorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading editor...</div>}>
      <ArtKeyEditor />
    </Suspense>
  );
}

