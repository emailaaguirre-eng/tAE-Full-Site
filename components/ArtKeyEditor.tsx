"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import ArtKeySelector from './ArtKeySelector';

interface ArtKeyData {
  title: string;
  theme: {
    template: string;
    bg_color: string;
    bg_image_id: number;
    bg_image_url: string;
    font: string;
    text_color: string;
    title_color: string;
    title_style: 'gradient' | 'solid';
    button_color: string;
    button_gradient: string;
    color_scope: 'title' | 'content' | 'buttons' | 'content_buttons';
  };
  links: Array<{ label: string; url: string }>;
  spotify: { url: string; autoplay: boolean };
  featured_video: { video_id: number; button_label: string };
  features: {
    enable_gallery: boolean;
    enable_video: boolean;
    show_guestbook: boolean;
    enable_featured_video: boolean;
    allow_img_uploads: boolean;
    allow_vid_uploads: boolean;
    gb_btn_view: boolean;
    gb_signing_status: 'open' | 'closed' | 'scheduled';
    gb_signing_start: string;
    gb_signing_end: string;
    gb_require_approval: boolean;
    img_require_approval: boolean;
    vid_require_approval: boolean;
    order: string[];
  };
  uploadedImages: string[];
  uploadedVideos: string[];
  customizations: any;
}

export default function ArtKeyEditor() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cart } = useCart();
  
  const productId = searchParams.get('product_id');
  const cartItemId = searchParams.get('cart_item_id');
  const fromCustomize = searchParams.get('from_customize') === 'true';
  
  // Get customization data from sessionStorage if coming from custom editor
  const [customizationData, setCustomizationData] = useState<any>(null);
  
  useEffect(() => {
    if (fromCustomize && typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('productCustomization');
      if (stored) {
        setCustomizationData(JSON.parse(stored));
      }
    }
  }, [fromCustomize]);

  // Template/Design mode state
  const [designMode, setDesignMode] = useState<'template' | 'custom' | null>(null);
  
  // Template carousel state
  const [templatePage, setTemplatePage] = useState(0);
  const templatesPerPage = 8; // 4 per row, 2 rows = 8 per page
  
  // Color carousel states
  const [bgColorPage, setBgColorPage] = useState(0);
  const [buttonColorPage, setButtonColorPage] = useState(0);
  const [titleColorPage, setTitleColorPage] = useState(0);
  
  // Background tab state
  const [bgTab, setBgTab] = useState<'solid' | 'stock' | 'upload'>('solid');
  
  // Device preview state
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  
  // Custom links state
  const [customLinks, setCustomLinks] = useState<Array<{ label: string; url: string }>>([]);
  const [newLinkLabel, setNewLinkLabel] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('https://www.');

  const [artKeyData, setArtKeyData] = useState<ArtKeyData>({
    title: 'Your Personalized Design',
    theme: {
      template: 'classic',
      bg_color: '#F6F7FB',
      bg_image_id: 0,
      bg_image_url: '',
      font: 'g:Playfair Display',
      text_color: '#111111',
      title_color: '#4f46e5',
      title_style: 'solid',
      button_color: '#4f46e5',
      button_gradient: '',
      color_scope: 'content',
    },
    links: [],
    spotify: { url: 'https://', autoplay: false },
    featured_video: { video_id: 0, button_label: 'Video Greeting' },
    features: {
      enable_gallery: false,
      enable_video: false,
      show_guestbook: false,
      enable_featured_video: false,
      allow_img_uploads: false,
      allow_vid_uploads: false,
      gb_btn_view: true,
      gb_signing_status: 'open',
      gb_signing_start: '',
      gb_signing_end: '',
      gb_require_approval: true,
      img_require_approval: true,
      vid_require_approval: true,
      order: ['gallery', 'guestbook', 'featured_video', 'video'],
    },
    uploadedImages: [],
    uploadedVideos: [],
    customizations: {},
  });

  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  // ArtKey reuse state
  const [showArtKeySelector, setShowArtKeySelector] = useState(false);
  const [currentArtKeyId, setCurrentArtKeyId] = useState<string | undefined>();

  // 32 Templates with variations of background, button, and title colors
  const templates = [
    // Page 1: Light & Clean (8 templates)
    { value: 'classic', name: 'Classic', bg: '#F6F7FB', button: '#4f46e5', text: '#1d1d1f', title: '#4f46e5' },
    { value: 'paper', name: 'Paper', bg: '#fbf8f1', button: '#8b4513', text: '#2d3436', title: '#8b4513' },
    { value: 'snow', name: 'Snow', bg: '#ffffff', button: '#3b82f6', text: '#1d1d1f', title: '#3b82f6' },
    { value: 'cloud', name: 'Cloud', bg: '#f8fafc', button: '#10b981', text: '#1d1d1f', title: '#10b981' },
    { value: 'pearl', name: 'Pearl', bg: '#fefefe', button: '#ec4899', text: '#1d1d1f', title: '#ec4899' },
    { value: 'ivory', name: 'Ivory', bg: '#fffff0', button: '#f59e0b', text: '#2d3436', title: '#f59e0b' },
    { value: 'mist', name: 'Mist', bg: '#f1f5f9', button: '#8b5cf6', text: '#1d1d1f', title: '#8b5cf6' },
    { value: 'cream', name: 'Cream', bg: '#fef3c7', button: '#d97706', text: '#2d3436', title: '#d97706' },
    
    // Page 2: Vibrant Gradients (8 templates)
    { value: 'aurora', name: 'Aurora', bg: 'linear-gradient(135deg,#667eea,#764ba2)', button: '#ffffff', text: '#ffffff', title: '#ffffff' },
    { value: 'sunset', name: 'Sunset', bg: 'linear-gradient(135deg,#ff6b6b,#feca57)', button: '#ffffff', text: '#ffffff', title: '#ffd700' },
    { value: 'ocean', name: 'Ocean', bg: 'linear-gradient(135deg,#667eea,#74ebd5)', button: '#ffffff', text: '#ffffff', title: '#74ebd5' },
    { value: 'rose_gold', name: 'Rose Gold', bg: 'linear-gradient(135deg,#f7971e,#ffd200)', button: '#d946ef', text: '#1d1d1f', title: '#d946ef' },
    { value: 'fire', name: 'Fire', bg: 'linear-gradient(135deg,#ff6b6b,#ee5a6f)', button: '#ffffff', text: '#ffffff', title: '#fef3c7' },
    { value: 'sky', name: 'Sky', bg: 'linear-gradient(135deg,#4facfe,#00f2fe)', button: '#ffffff', text: '#ffffff', title: '#fde047' },
    { value: 'forest', name: 'Forest', bg: 'linear-gradient(135deg,#134e5e,#71b280)', button: '#ffffff', text: '#ffffff', title: '#d4fc79' },
    { value: 'berry', name: 'Berry', bg: 'linear-gradient(135deg,#c026d3,#e879f9)', button: '#ffffff', text: '#ffffff', title: '#fde047' },
    
    // Page 3: Soft Pastels (8 templates)
    { value: 'lavender', name: 'Lavender', bg: 'linear-gradient(135deg,#e0c3fc,#8ec5fc)', button: '#8b5cf6', text: '#1d1d1f', title: '#7c3aed' },
    { value: 'mint', name: 'Mint', bg: 'linear-gradient(135deg,#d4fc79,#96e6a1)', button: '#10b981', text: '#1d1d1f', title: '#047857' },
    { value: 'peach', name: 'Peach', bg: 'linear-gradient(135deg,#ffecd2,#fcb69f)', button: '#f97316', text: '#1d1d1f', title: '#ea580c' },
    { value: 'cotton', name: 'Cotton Candy', bg: 'linear-gradient(135deg,#a8edea,#fed6e3)', button: '#ec4899', text: '#1d1d1f', title: '#db2777' },
    { value: 'lemon', name: 'Lemon Fresh', bg: 'linear-gradient(135deg,#fddb92,#d1fdff)', button: '#06b6d4', text: '#1d1d1f', title: '#0891b2' },
    { value: 'pastel', name: 'Pastel Sky', bg: 'linear-gradient(135deg,#fbc2eb,#a6c1ee)', button: '#8b5cf6', text: '#1d1d1f', title: '#7c3aed' },
    { value: 'aqua', name: 'Aqua Teal', bg: 'linear-gradient(135deg,#00d2ff,#3a7bd5)', button: '#0ea5e9', text: '#ffffff', title: '#ffffff' },
    { value: 'blush', name: 'Pink Blush', bg: 'linear-gradient(135deg,#ff9a9e,#fecfef)', button: '#ec4899', text: '#1d1d1f', title: '#db2777' },
    
    // Page 4: Dark & Bold (8 templates)
    { value: 'dark', name: 'Dark Mode', bg: '#0f1218', button: '#667eea', text: '#ffffff', title: '#667eea' },
    { value: 'bold', name: 'Bold', bg: '#111111', button: '#ffffff', text: '#ffffff', title: '#ffffff' },
    { value: 'cosmic', name: 'Cosmic', bg: 'linear-gradient(135deg,#1a1a2e,#16213e)', button: '#ef4444', text: '#ffffff', title: '#fbbf24' },
    { value: 'midnight', name: 'Midnight', bg: 'linear-gradient(135deg,#000428,#004e92)', button: '#60a5fa', text: '#ffffff', title: '#60a5fa' },
    { value: 'vintage', name: 'Vintage', bg: 'linear-gradient(135deg,#8b4513,#daa520)', button: '#ffffff', text: '#ffffff', title: '#ffd700' },
    { value: 'electric', name: 'Electric', bg: 'linear-gradient(135deg,#06b6d4,#3b82f6)', button: '#fde047', text: '#ffffff', title: '#fde047' },
    { value: 'neon', name: 'Neon', bg: 'linear-gradient(135deg,#ec4899,#8b5cf6)', button: '#fde047', text: '#ffffff', title: '#fde047' },
    { value: 'steel', name: 'Steel', bg: 'linear-gradient(135deg,#434343,#666666)', button: '#ffffff', text: '#ffffff', title: '#fde047' },
    
    // Page 5: Arizona Sports Teams (8 templates)
    { value: 'uofa', name: 'UofA Wildcats', bg: 'linear-gradient(135deg,#003366,#CC0033)', button: '#ffffff', text: '#ffffff', title: '#ffffff' },
    { value: 'asu', name: 'ASU Sun Devils', bg: 'linear-gradient(135deg,#8C1D40,#FFC627)', button: '#ffffff', text: '#ffffff', title: '#FFC627' },
    { value: 'nau', name: 'NAU Lumberjacks', bg: 'linear-gradient(135deg,#003466,#FFC82E)', button: '#ffffff', text: '#ffffff', title: '#FFC82E' },
    { value: 'cardinals', name: 'AZ Cardinals', bg: 'linear-gradient(135deg,#97233F,#000000)', button: '#ffffff', text: '#ffffff', title: '#ffffff' },
    { value: 'suns', name: 'Suns/Mercury', bg: 'linear-gradient(135deg,#1D1160,#E56020)', button: '#ffffff', text: '#ffffff', title: '#E56020' },
    { value: 'dbacks', name: 'Diamondbacks', bg: 'linear-gradient(135deg,#A71930,#E3D4AD)', button: '#000000', text: '#000000', title: '#A71930' },
    { value: 'rattlers', name: 'AZ Rattlers', bg: 'linear-gradient(135deg,#000000,#8B0000)', button: '#D4AF37', text: '#ffffff', title: '#D4AF37' },
    { value: 'rising', name: 'PHX Rising FC', bg: 'linear-gradient(135deg,#000000,#B4975A)', button: '#E84C88', text: '#ffffff', title: '#B4975A' },
  ];

  // Color palettes (matching WordPress plugin)
  const buttonColors = [
    // Page 1: Pure Solid Colors
    { bg: '#ffffff', color: '#ffffff', label: 'White', type: 'solid' },
    { bg: '#fef3c7', color: '#fef3c7', label: 'Cream', type: 'solid' },
    { bg: '#fde047', color: '#fde047', label: 'Yellow', type: 'solid' },
    { bg: '#f59e0b', color: '#f59e0b', label: 'Amber', type: 'solid' },
    { bg: '#f97316', color: '#f97316', label: 'Orange', type: 'solid' },
    { bg: '#ef4444', color: '#ef4444', label: 'Red', type: 'solid' },
    { bg: '#ec4899', color: '#ec4899', label: 'Pink', type: 'solid' },
    { bg: '#a855f7', color: '#a855f7', label: 'Purple', type: 'solid' },
    { bg: '#8b5cf6', color: '#8b5cf6', label: 'Violet', type: 'solid' },
    { bg: '#3b82f6', color: '#3b82f6', label: 'Blue', type: 'solid' },
    { bg: '#10b981', color: '#10b981', label: 'Emerald', type: 'solid' },
    { bg: '#1d1d1f', color: '#1d1d1f', label: 'Black', type: 'solid' },
    // Page 2: Light & Pastel Gradients
    { bg: 'linear-gradient(135deg,#ffecd2,#fcb69f)', color: 'gradient', label: 'Peachy', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#ff9a9e,#fecfef)', color: 'gradient', label: 'Pink Blush', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#a8edea,#fed6e3)', color: 'gradient', label: 'Cotton Candy', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#e0c3fc,#8ec5fc)', color: 'gradient', label: 'Lavender', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#fddb92,#d1fdff)', color: 'gradient', label: 'Lemon Fresh', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#fbc2eb,#a6c1ee)', color: 'gradient', label: 'Pastel Sky', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#d4fc79,#96e6a1)', color: 'gradient', label: 'Lime Mint', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#fa709a,#fee140)', color: 'gradient', label: 'Sunset', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#f7971e,#ffd200)', color: 'gradient', label: 'Golden Sun', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#c3e4ff,#6ec3f4)', color: 'gradient', label: 'Sky Blue', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#89f7fe,#66a6ff)', color: 'gradient', label: 'Ice Blue', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#74ebd5,#ACB6E5)', color: 'gradient', label: 'Sky Mist', type: 'gradient' },
    // Page 3: Vibrant Gradients
    { bg: 'linear-gradient(135deg,#ff6b6b,#feca57)', color: 'gradient', label: 'Fire Glow', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#f093fb,#f5576c)', color: 'gradient', label: 'Berry Blast', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#fa8bff,#2bd2ff)', color: 'gradient', label: 'Neon Dream', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#667eea,#764ba2)', color: 'gradient', label: 'Purple Magic', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#4facfe,#00f2fe)', color: 'gradient', label: 'Electric Blue', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#4481eb,#04befe)', color: 'gradient', label: 'Cool Neon', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#43e97b,#38f9d7)', color: 'gradient', label: 'Aqua Marine', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#0ba360,#3cba92)', color: 'gradient', label: 'Emerald Isle', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#134e5e,#71b280)', color: 'gradient', label: 'Forest', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#ee5a6f,#f29263)', color: 'gradient', label: 'Coral', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#d3cce3,#e9e4f0)', color: 'gradient', label: 'Lavender Mist', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#92fe9d,#00c9ff)', color: 'gradient', label: 'Mint Fresh', type: 'gradient' },
    // Page 4: Dark Gradients
    { bg: 'linear-gradient(135deg,#434343,#666666)', color: 'gradient', label: 'Steel Gray', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#1a1a1a,#333333)', color: 'gradient', label: 'Steel', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#30cfd0,#330867)', color: 'gradient', label: 'Deep Blue', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#0c0c0c,#16213e)', color: 'gradient', label: 'Cosmic', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#000428,#004e92)', color: 'gradient', label: 'Midnight', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#1e3a8a,#3b82f6)', color: 'gradient', label: 'Royal Blue', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#4158d0,#c850c0)', color: 'gradient', label: 'Vibrant', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#485563,#29323c)', color: 'gradient', label: 'Charcoal', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#2c3e50,#3498db)', color: 'gradient', label: 'Ocean Deep', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#16a34a,#15803d)', color: 'gradient', label: 'Forest Green', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#92400e,#78350f)', color: 'gradient', label: 'Brown', type: 'gradient' },
    { bg: 'linear-gradient(135deg,#881337,#9f1239)', color: 'gradient', label: 'Deep Rose', type: 'gradient' },
  ];

  // Stock background images - 24 images (4 pages of 6)
  const stockBackgrounds = [
    // Page 1: Nature & Sky
    { label: 'Cloudy Sky', url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Golden Sunset', url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Mountain Lake', url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Aurora Borealis', url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Starry Night', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Pink Clouds', url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1600&q=80&auto=format&fit=crop' },
    
    // Page 2: Ocean & Beach
    { label: 'Ocean Waves', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Tropical Beach', url: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Sunset Beach', url: 'https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Crystal Water', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Palm Trees', url: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Coastal Cliffs', url: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=1600&q=80&auto=format&fit=crop' },
    
    // Page 3: Forest & Nature
    { label: 'Forest Mist', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Autumn Forest', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Cherry Blossoms', url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Lavender Field', url: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Sunflowers', url: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Bamboo Grove', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80&auto=format&fit=crop' },
    
    // Page 4: Urban & Textures
    { label: 'City Nightline', url: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Desert Dunes', url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Marble Texture', url: 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Rose Gold', url: 'https://images.unsplash.com/photo-1557683316-973673bdar2?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Geometric Pattern', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1600&q=80&auto=format&fit=crop' },
    { label: 'Watercolor', url: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1600&q=80&auto=format&fit=crop' },
  ];
  
  // Stock background pagination
  const [stockBgPage, setStockBgPage] = useState(0);
  const stockBgPerPage = 6;
  const totalStockPages = Math.ceil(stockBackgrounds.length / stockBgPerPage);
  
  const getCurrentStockBackgrounds = () => {
    const start = stockBgPage * stockBgPerPage;
    return stockBackgrounds.slice(start, start + stockBgPerPage);
  };

  // Google Fonts list
  const fonts = [
    { value: 'system', label: 'System' },
    { value: 'serif', label: 'Serif' },
    { value: 'mono', label: 'Monospace' },
    { value: 'g:Inter', label: 'Inter' },
    { value: 'g:Poppins', label: 'Poppins' },
    { value: 'g:Lato', label: 'Lato' },
    { value: 'g:Montserrat', label: 'Montserrat' },
    { value: 'g:Roboto', label: 'Roboto' },
    { value: 'g:Playfair Display', label: 'Playfair Display' },
    { value: 'g:Open Sans', label: 'Open Sans' },
  ];

  // Feature definitions - state for drag reordering
  const [featureDefs, setFeatureDefs] = useState([
    { key: 'gallery', label: '📸 Image Gallery', field: 'enable_gallery' },
    { key: 'guestbook', label: '📖 Guestbook', field: 'show_guestbook' },
    { key: 'featured_video', label: '▶️ Featured Video', field: 'enable_featured_video' },
    { key: 'video', label: '🎥 Video Gallery', field: 'enable_video' },
  ]);
  const [draggedFeature, setDraggedFeature] = useState<number | null>(null);

  // Drag and drop handlers for feature reordering
  const handleFeatureDragStart = (index: number) => {
    setDraggedFeature(index);
  };

  const handleFeatureDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedFeature === null || draggedFeature === index) return;
    
    const newFeatures = [...featureDefs];
    const draggedItem = newFeatures[draggedFeature];
    newFeatures.splice(draggedFeature, 1);
    newFeatures.splice(index, 0, draggedItem);
    setFeatureDefs(newFeatures);
    setDraggedFeature(index);
  };

  const handleFeatureDragEnd = () => {
    setDraggedFeature(null);
  };

  // Get current page templates (8 per page for 32 templates = 4 pages)
  const getCurrentPageTemplates = () => {
    const start = templatePage * templatesPerPage;
    const end = start + templatesPerPage;
    return templates.slice(start, end);
  };

  const totalTemplatePages = Math.ceil(templates.length / templatesPerPage);

  // Get colors for current page
  const getColorsForPage = (page: number, colorArray: typeof buttonColors) => {
    const start = page * 12;
    const end = start + 12;
    return colorArray.slice(start, end);
  };

  // Handle template selection
  const handleTemplateSelect = (template: typeof templates[0]) => {
    setSelectedTemplate(template.value);
    setArtKeyData(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        template: template.value,
        bg_color: typeof template.bg === 'string' && !template.bg.startsWith('linear-gradient') ? template.bg : (typeof template.bg === 'string' ? template.bg : prev.theme.bg_color),
        button_color: template.button,
        title_color: template.title, // Set title color from template
        text_color: template.text,
        bg_image_url: '', // Clear any background image when selecting template
      },
    }));
  };

  // Handle color selection
  const handleColorSelect = (color: typeof buttonColors[0], type: 'button' | 'title' | 'background') => {
    if (color.type === 'gradient') {
      if (type === 'button') {
        setArtKeyData(prev => ({
          ...prev,
          theme: { ...prev.theme, button_gradient: color.bg, button_color: color.bg.match(/#[0-9a-fA-F]{6}/)?.[0] || '#667eea' },
        }));
      } else if (type === 'title') {
        setArtKeyData(prev => ({
          ...prev,
          theme: { ...prev.theme, title_color: color.bg.match(/#[0-9a-fA-F]{6}/)?.[0] || '#667eea' },
        }));
      } else if (type === 'background') {
        setArtKeyData(prev => ({
          ...prev,
          theme: { ...prev.theme, bg_color: color.bg, bg_image_url: '' },
        }));
      }
    } else {
      if (type === 'button') {
        setArtKeyData(prev => ({
          ...prev,
          theme: { ...prev.theme, button_color: color.color, button_gradient: '' },
        }));
      } else if (type === 'title') {
        setArtKeyData(prev => ({
          ...prev,
          theme: { ...prev.theme, title_color: color.color },
        }));
      } else if (type === 'background') {
        setArtKeyData(prev => ({
          ...prev,
          theme: { ...prev.theme, bg_color: color.color, bg_image_url: '' },
        }));
      }
    }
  };

  // Handle image upload (using new WordPress/Cloudinary backend)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Upload files one by one (new API handles single file per request)
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Use new image upload API with WordPress backend
        const response = await fetch('/api/upload/image?backend=wordpress', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setArtKeyData(prev => ({
            ...prev,
            uploadedImages: [...prev.uploadedImages, result.url],
          }));
        } else {
          const error = await response.json();
          console.error('Upload failed:', error);
          alert(`Failed to upload ${file.name}: ${error.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Upload failed:', error);
        alert(`Failed to upload ${file.name}`);
      }
    }
  };

  // Handle video upload
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('file', file);
    });

    try {
      const response = await fetch('/api/gelato/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setArtKeyData(prev => ({
          ...prev,
          uploadedVideos: [...prev.uploadedVideos, result.fileUrl],
        }));
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  // Handle background image upload (using new WordPress/Cloudinary backend)
  const handleBackgroundUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      // Use new image upload API with WordPress backend
      const response = await fetch('/api/upload/image?backend=wordpress', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setArtKeyData(prev => ({
          ...prev,
          theme: { 
            ...prev.theme, 
            bg_image_url: result.url, 
            bg_image_id: result.id || 1 
          },
        }));
      } else {
        const error = await response.json();
        console.error('Upload failed:', error);
        alert(`Failed to upload background: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload background image');
    }
  };

  // Add custom link
  const handleAddLink = () => {
    if (newLinkLabel && newLinkUrl) {
      setCustomLinks([...customLinks, { label: newLinkLabel, url: newLinkUrl }]);
      setArtKeyData(prev => ({
        ...prev,
        links: [...prev.links, { label: newLinkLabel, url: newLinkUrl }],
      }));
      setNewLinkLabel('');
      setNewLinkUrl('https://www.');
    }
  };

  // Remove custom link
  const handleRemoveLink = (index: number) => {
    const updated = customLinks.filter((_, i) => i !== index);
    setCustomLinks(updated);
    setArtKeyData(prev => ({
      ...prev,
      links: updated,
    }));
  };

  // Toggle feature
  const toggleFeature = (field: string) => {
    setArtKeyData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [field]: !prev.features[field as keyof typeof prev.features],
      },
    }));
  };

  // State for saved ArtKey info (QR code, share URL)
  const [savedArtKey, setSavedArtKey] = useState<{
    id: string;
    shareUrl: string;
    qrCodeUrl?: string;
  } | null>(null);

  // Get or create session ID for ArtKey reuse
  const getSessionId = (): string => {
    if (typeof window === 'undefined') return 'server-session';
    let sessionId = sessionStorage.getItem('artkey_session_id');
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('artkey_session_id', sessionId);
    }
    return sessionId;
  };

  // Load existing ArtKey
  const loadExistingArtKey = async (artKeyId: string) => {
    try {
      const response = await fetch(`/api/artkey/store?id=${artKeyId}`);
      if (response.ok) {
        const data = await response.json();
        const artKey = data.artKey;
        
        // Load ArtKey data into editor
        setArtKeyData(artKey.artKeyData);
        setCustomLinks(artKey.artKeyData.links || []);
        setCurrentArtKeyId(artKey.id);
        setShowArtKeySelector(false);
      }
    } catch (error) {
      console.error('Failed to load ArtKey:', error);
      alert('Failed to load ArtKey. Please try again.');
    }
  };

  // Handle save and checkout
  const handleSaveAndCheckout = async () => {
    try {
      const sessionId = getSessionId();
      
      const response = await fetch('/api/artkey/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          productId,
          cartItemId,
          artKeyData: {
            ...artKeyData,
            links: customLinks,
          },
          customization: customizationData,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Store saved ArtKey info (includes QR code and share URL)
        setSavedArtKey({
          id: result.artKeyId,
          shareUrl: result.shareUrl || '',
          qrCodeUrl: result.qrCodeUrl,
        });

        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('productCustomization');
          
          // Show success message with QR code, then redirect
          // You can customize this to show a modal instead
          if (result.shareUrl) {
            alert(`ArtKey saved! Share URL: ${result.shareUrl}`);
          }
          
          window.location.href = '/checkout';
        }
      } else {
        const error = await response.json();
        console.error('Save failed:', error);
        alert(`Failed to save ArtKey: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save ArtKey. Please try again.');
    }
  };

  // Get preview background style
  const getPreviewBackground = () => {
    if (artKeyData.theme.bg_image_url) {
      return {
        backgroundImage: `url(${artKeyData.theme.bg_image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#F6F7FB', // Fallback color
      };
    }
    if (artKeyData.theme.bg_color && artKeyData.theme.bg_color.startsWith('linear-gradient')) {
      return { 
        background: artKeyData.theme.bg_color,
        backgroundColor: '#F6F7FB', // Fallback for browsers that don't support gradients
      };
    }
    return { 
      backgroundColor: artKeyData.theme.bg_color || '#F6F7FB',
    };
  };

  // Get button text color - black for light buttons, white for dark buttons
  const getButtonTextColor = (buttonColor: string) => {
    // If it's white or very light, use black text
    if (buttonColor === '#ffffff' || buttonColor === '#FFFFFF' || 
        buttonColor === '#fefefe' || buttonColor === '#fef3c7' ||
        buttonColor === '#fde047' || buttonColor === '#fffff0') {
      return '#000000';
    }
    return '#ffffff';
  };

  return (
    <div className="min-h-screen bg-brand-lightest">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-brand-medium to-brand-dark text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-2xl font-bold font-playfair">✨ Edit Your ArtKey Page</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setShowArtKeySelector(true)}
                className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all border border-white/30"
                title="Use an existing ArtKey design"
              >
                🔄 Use Existing ArtKey
              </button>
              <a
                href="#"
                target="_blank"
                className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all border border-white/30"
              >
                👁️ Preview
              </a>
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all border border-white/30"
              >
                🛍️ Save & Continue Shopping
              </button>
              <button
                onClick={handleSaveAndCheckout}
                className="px-6 py-2 bg-brand-dark text-white rounded-lg font-semibold hover:bg-brand-darkest transition-all"
              >
                ✅ Save & Checkout
              </button>
            </div>
          </div>
          {customizationData && (
            <p className="text-sm text-white/80 mt-2">
              Customizing: {customizationData.productName} - ${customizationData.totalPrice}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Live Preview */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-brand-darkest font-playfair">Live Preview</h3>
                <div className="flex gap-2 bg-brand-lightest p-1 rounded-lg">
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-3 py-1 rounded text-sm transition-all font-medium ${
                      previewDevice === 'mobile' ? 'bg-white shadow text-brand-dark' : 'text-gray-600'
                    }`}
                  >
                    📱 Mobile
                  </button>
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-3 py-1 rounded text-sm transition-all font-medium ${
                      previewDevice === 'desktop' ? 'bg-white shadow text-brand-dark' : 'text-gray-600'
                    }`}
                  >
                    🖥️ Desktop
                  </button>
                </div>
              </div>
              
              {/* Mobile Frame */}
              {previewDevice === 'mobile' && (
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-[32px] p-2 shadow-2xl relative" style={{ width: 'min(375px, 100%)' }}>
                    {/* Dynamic Island / Notch */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-black rounded-full w-24 h-7 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-800 ring-1 ring-gray-700"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-800 ring-1 ring-gray-700"></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-[28px] overflow-hidden relative" style={{ height: 'min(812px, 80vh)', width: '100%' }}>
                      <div
                        className="h-full w-full pt-12 pb-8 px-8 flex flex-col items-center justify-center text-center min-h-[400px]"
                        style={getPreviewBackground()}
                      >
                        <h1 
                          className="text-2xl md:text-3xl font-bold mb-4 font-playfair break-words"
                          style={{ 
                            color: artKeyData.theme.title_style === 'gradient' ? 'transparent' : artKeyData.theme.title_color,
                            background: artKeyData.theme.title_style === 'gradient' ? `linear-gradient(135deg, ${artKeyData.theme.title_color}, ${artKeyData.theme.button_color})` : 'none',
                            backgroundClip: artKeyData.theme.title_style === 'gradient' ? 'text' : 'unset',
                            WebkitBackgroundClip: artKeyData.theme.title_style === 'gradient' ? 'text' : 'unset',
                          }}
                        >
                          {artKeyData.title || 'Your Title Here'}
                        </h1>
                        {/* ArtKey Buttons Preview */}
                        <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                          {customLinks.length > 0 && (
                            customLinks.slice(0, 3).map((link, idx) => (
                              <button
                                key={idx}
                                className="w-full py-2 px-4 rounded-full text-sm font-semibold transition-all shadow-md"
                                style={{ backgroundColor: artKeyData.theme.button_color, color: getButtonTextColor(artKeyData.theme.button_color) }}
                              >
                                {link.label || `Link ${idx + 1}`}
                              </button>
                            ))
                          )}
                          {artKeyData.spotify.url && artKeyData.spotify.url.length > 10 && (
                            <button
                              className="w-full py-2 px-4 rounded-full text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                              style={{ backgroundColor: artKeyData.theme.button_color, color: getButtonTextColor(artKeyData.theme.button_color) }}
                            >
                              🎵 Playlist
                            </button>
                          )}
                          {artKeyData.features.show_guestbook && 
                           (artKeyData.features.gb_btn_view || artKeyData.features.gb_signing_status !== 'closed') && (
                            <button
                              className="w-full py-2 px-4 rounded-full text-sm font-semibold transition-all shadow-md"
                              style={{ backgroundColor: artKeyData.theme.button_color, color: getButtonTextColor(artKeyData.theme.button_color) }}
                            >
                              📝 {artKeyData.features.gb_signing_status === 'open' || artKeyData.features.gb_signing_status === 'scheduled' ? 'Sign Guestbook' : 'Guestbook'}
                            </button>
                          )}
                          {artKeyData.features.enable_featured_video && (
                            <button
                              className="w-full py-2 px-4 rounded-full text-sm font-semibold transition-all shadow-md"
                              style={{ backgroundColor: artKeyData.theme.button_color, color: getButtonTextColor(artKeyData.theme.button_color) }}
                            >
                              🎬 {artKeyData.featured_video.button_label || 'Watch Video'}
                            </button>
                          )}
                          {/* Image Gallery Button */}
                          {artKeyData.features.enable_gallery && (
                            <button
                              className="w-full py-2 px-4 rounded-full text-sm font-semibold transition-all shadow-md"
                              style={{ backgroundColor: artKeyData.theme.button_color, color: getButtonTextColor(artKeyData.theme.button_color) }}
                            >
                              🖼️ Image Gallery {artKeyData.uploadedImages.length > 0 && `(${artKeyData.uploadedImages.length})`}
                            </button>
                          )}
                          {/* Video Gallery Button */}
                          {artKeyData.features.enable_video && (
                            <button
                              className="w-full py-2 px-4 rounded-full text-sm font-semibold transition-all shadow-md"
                              style={{ backgroundColor: artKeyData.theme.button_color, color: getButtonTextColor(artKeyData.theme.button_color) }}
                            >
                              🎥 Video Gallery {artKeyData.uploadedVideos.length > 0 && `(${artKeyData.uploadedVideos.length})`}
                            </button>
                          )}
                        </div>

                        {/* Images Preview Thumbnails */}
                        {artKeyData.uploadedImages.length > 0 && (
                          <div className="grid grid-cols-4 gap-1 mt-3 w-full max-w-xs">
                            {artKeyData.uploadedImages.slice(0, 4).map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`Upload ${idx + 1}`}
                                className="w-full h-12 object-cover rounded-md border border-white/50 shadow-sm"
                              />
                            ))}
                          </div>
                        )}
                        
                        {/* Empty State */}
                        {!artKeyData.features.enable_gallery && 
                         !artKeyData.features.enable_video && 
                         !artKeyData.features.show_guestbook && 
                         !artKeyData.features.enable_featured_video &&
                         (!artKeyData.spotify.url || artKeyData.spotify.url.length <= 10) &&
                         customLinks.length === 0 && (
                          <div className="mt-4 text-sm text-gray-500 italic text-xs">
                            Enable features in Step 3 to see buttons here
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Desktop Preview */}
              {previewDevice === 'desktop' && (
                <div
                  className="w-full rounded-xl overflow-hidden border-2 border-brand-light"
                  style={{ ...getPreviewBackground(), minHeight: '500px', aspectRatio: '1 / 1' }}
                >
                  <div className="p-8 h-full flex flex-col items-center justify-center text-center min-h-[500px]">
                    <h1 
                      className="text-3xl md:text-4xl font-bold mb-4 font-playfair break-words"
                      style={{ 
                        color: artKeyData.theme.title_style === 'gradient' ? 'transparent' : artKeyData.theme.title_color,
                        background: artKeyData.theme.title_style === 'gradient' ? `linear-gradient(135deg, ${artKeyData.theme.title_color}, ${artKeyData.theme.button_color})` : 'none',
                        backgroundClip: artKeyData.theme.title_style === 'gradient' ? 'text' : 'unset',
                        WebkitBackgroundClip: artKeyData.theme.title_style === 'gradient' ? 'text' : 'unset',
                      }}
                    >
                      {artKeyData.title || 'Your Title Here'}
                    </h1>
                    {/* ArtKey Buttons Preview */}
                    <div className="flex flex-col gap-3 mt-4 w-full max-w-md">
                      {customLinks.length > 0 && (
                        customLinks.slice(0, 3).map((link, idx) => (
                          <button
                            key={idx}
                            className="w-full py-3 px-6 rounded-full text-base font-semibold transition-all shadow-md"
                            style={{ backgroundColor: artKeyData.theme.button_color, color: getButtonTextColor(artKeyData.theme.button_color) }}
                          >
                            {link.label || `Link ${idx + 1}`}
                          </button>
                        ))
                      )}
                      {artKeyData.spotify.url && artKeyData.spotify.url.length > 10 && (
                        <button
                          className="w-full py-3 px-6 rounded-full text-base font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                          style={{ backgroundColor: artKeyData.theme.button_color, color: getButtonTextColor(artKeyData.theme.button_color) }}
                        >
                          🎵 Playlist
                        </button>
                      )}
                      {artKeyData.features.show_guestbook && 
                       (artKeyData.features.gb_btn_view || artKeyData.features.gb_signing_status !== 'closed') && (
                        <button
                          className="w-full py-3 px-6 rounded-full text-base font-semibold transition-all shadow-md"
                          style={{ backgroundColor: artKeyData.theme.button_color, color: getButtonTextColor(artKeyData.theme.button_color) }}
                        >
                          📝 {artKeyData.features.gb_signing_status === 'open' || artKeyData.features.gb_signing_status === 'scheduled' ? 'Sign Guestbook' : 'Guestbook'}
                        </button>
                      )}
                      {artKeyData.features.enable_featured_video && (
                        <button
                          className="w-full py-3 px-6 rounded-full text-base font-semibold transition-all shadow-md"
                          style={{ backgroundColor: artKeyData.theme.button_color, color: getButtonTextColor(artKeyData.theme.button_color) }}
                        >
                          🎬 {artKeyData.featured_video.button_label || 'Watch Video'}
                        </button>
                      )}
                      {/* Image Gallery Button */}
                      {artKeyData.features.enable_gallery && (
                        <button
                          className="w-full py-3 px-6 rounded-full text-base font-semibold transition-all shadow-md"
                          style={{ backgroundColor: artKeyData.theme.button_color, color: getButtonTextColor(artKeyData.theme.button_color) }}
                        >
                          🖼️ Image Gallery {artKeyData.uploadedImages.length > 0 && `(${artKeyData.uploadedImages.length})`}
                        </button>
                      )}
                      {/* Video Gallery Button */}
                      {artKeyData.features.enable_video && (
                        <button
                          className="w-full py-3 px-6 rounded-full text-base font-semibold transition-all shadow-md"
                          style={{ backgroundColor: artKeyData.theme.button_color, color: getButtonTextColor(artKeyData.theme.button_color) }}
                        >
                          🎥 Video Gallery {artKeyData.uploadedVideos.length > 0 && `(${artKeyData.uploadedVideos.length})`}
                        </button>
                      )}
                    </div>

                    {/* Images Preview Thumbnails */}
                    {artKeyData.uploadedImages.length > 0 && (
                      <div className="grid grid-cols-4 gap-2 mt-4 w-full max-w-md">
                        {artKeyData.uploadedImages.slice(0, 4).map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Upload ${idx + 1}`}
                            className="w-full h-16 object-cover rounded-lg border border-white/50 shadow-sm"
                          />
                        ))}
                      </div>
                    )}

                    {/* Empty State */}
                    {!artKeyData.features.enable_gallery && 
                     !artKeyData.features.enable_video && 
                     !artKeyData.features.show_guestbook && 
                     !artKeyData.features.enable_featured_video &&
                     (!artKeyData.spotify.url || artKeyData.spotify.url.length <= 10) &&
                     customLinks.length === 0 && (
                      <div className="mt-4 text-sm text-gray-500 italic">
                        Enable features in Step 3 to see buttons here
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Editor Panel */}
          <div className="space-y-6">
            {/* Step 1: Choose Template or Design Your Own */}
            {designMode === null && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-brand-medium text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <h3 className="text-xl font-bold text-brand-darkest font-playfair">Choose a Template or Design Your Own ArtKey</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Choose Template Button */}
                  <button
                    onClick={() => setDesignMode('template')}
                    className="group relative bg-gradient-to-br from-brand-light to-brand-medium p-8 rounded-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-brand-light hover:border-brand-dark"
                  >
                    <div className="text-5xl mb-4">🎨</div>
                    <div className="text-2xl font-bold text-brand-darkest mb-2 font-playfair">Choose a Template</div>
                    <div className="text-sm text-brand-darkest opacity-80">Pick from 32 pre-designed templates</div>
                    <div className="absolute top-2 right-2 text-2xl opacity-20 group-hover:opacity-40 transition-opacity">→</div>
                  </button>

                  {/* Design Your Own Button */}
                  <button
                    onClick={() => setDesignMode('custom')}
                    className="group relative bg-gradient-to-br from-brand-medium to-brand-dark text-white p-8 rounded-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-brand-medium hover:border-brand-darkest"
                  >
                    <div className="text-5xl mb-4">✨</div>
                    <div className="text-2xl font-bold mb-2 font-playfair">Design Your Own</div>
                    <div className="text-sm opacity-90">Start from scratch with full customization</div>
                    <div className="absolute top-2 right-2 text-2xl opacity-20 group-hover:opacity-40 transition-opacity">→</div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Template Selection */}
            {designMode === 'template' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-medium text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-darkest font-playfair">Choose Template</h3>
                    <p className="text-sm text-gray-500">Select from 32 beautiful templates</p>
                  </div>
                  <button
                    onClick={() => setDesignMode(null)}
                    className="px-4 py-2 text-sm border border-brand-light rounded-lg hover:bg-brand-lightest transition-all"
                  >
                    ← Back
                  </button>
                </div>
                
                {/* Template Carousel - 4 columns, 2 rows = 8 per page */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setTemplatePage(Math.max(0, templatePage - 1))}
                    disabled={templatePage === 0}
                    className="w-10 h-10 rounded-lg border-2 border-brand-light hover:border-brand-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    ‹
                  </button>
                  <div className="grid grid-cols-4 gap-2 flex-1">
                    {getCurrentPageTemplates().map(tpl => (
                      <button
                        key={tpl.value}
                        onClick={() => handleTemplateSelect(tpl)}
                        className={`p-2 rounded-xl border-2 transition-all ${
                          selectedTemplate === tpl.value
                            ? 'border-brand-dark shadow-lg scale-105'
                            : 'border-brand-light hover:border-brand-medium'
                        }`}
                      >
                        <div 
                          className="w-full h-16 rounded-lg mb-2 relative overflow-hidden" 
                          style={{ 
                            background: typeof tpl.bg === 'string' && tpl.bg.startsWith('linear-gradient') ? tpl.bg : tpl.bg,
                            backgroundColor: typeof tpl.bg === 'string' && !tpl.bg.startsWith('linear-gradient') ? tpl.bg : undefined
                          }}
                        >
                          {/* Show title color as text */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div 
                              className="text-xs font-bold"
                              style={{ color: tpl.title }}
                            >
                              Aa
                            </div>
                          </div>
                          {/* Show button color as small button */}
                          <div className="absolute bottom-1 right-1">
                            <div 
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: tpl.button }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-xs font-semibold text-brand-darkest text-center">{tpl.name}</div>
                        {selectedTemplate === tpl.value && (
                          <div className="text-xs text-brand-medium mt-1 text-center">✓</div>
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setTemplatePage(Math.min(totalTemplatePages - 1, templatePage + 1))}
                    disabled={templatePage >= totalTemplatePages - 1}
                    className="w-10 h-10 rounded-lg border-2 border-brand-light hover:border-brand-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    ›
                  </button>
                </div>
                <div className="text-center text-sm text-gray-500">
                  Page {templatePage + 1} of {totalTemplatePages}
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">Templates include background, button, and title colors. You can customize them in the next steps!</p>
              </div>
            )}

            {/* Step 1: Design Your Own - Background */}
            {designMode === 'custom' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-medium text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-brand-darkest font-playfair">Design Your Own - Choose Background</h3>
                    <p className="text-sm text-gray-500">Start from scratch with full control</p>
                  </div>
                  <button
                    onClick={() => setDesignMode(null)}
                    className="px-4 py-2 text-sm border border-brand-light rounded-lg hover:bg-brand-lightest transition-all"
                  >
                    ← Back
                  </button>
                </div>
                
                {/* Background Tabs */}
                <div className="flex gap-2 mb-4 bg-brand-lightest p-1 rounded-lg">
                  <button
                    onClick={() => setBgTab('solid')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      bgTab === 'solid' ? 'bg-white shadow' : ''
                    }`}
                  >
                    Solid Color
                  </button>
                  <button
                    onClick={() => setBgTab('stock')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      bgTab === 'stock' ? 'bg-white shadow' : ''
                    }`}
                  >
                    Stock Photos
                  </button>
                  <button
                    onClick={() => setBgTab('upload')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      bgTab === 'upload' ? 'bg-white shadow' : ''
                    }`}
                  >
                    Upload
                  </button>
                </div>

                {/* Solid Color Tab */}
                {bgTab === 'solid' && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() => setBgColorPage(Math.max(0, bgColorPage - 1))}
                        disabled={bgColorPage === 0}
                        className="w-8 h-8 rounded border border-brand-light disabled:opacity-50"
                      >
                        ‹
                      </button>
                      <span className="text-xs text-gray-500 flex-1 text-center">
                        {bgColorPage === 0 ? 'Solid Colors' : bgColorPage === 1 ? 'Gradients: Cool' : 'Gradients: Warm'}
                      </span>
                      <button
                        onClick={() => setBgColorPage(Math.min(2, bgColorPage + 1))}
                        disabled={bgColorPage === 2}
                        className="w-8 h-8 rounded border border-brand-light disabled:opacity-50"
                      >
                        ›
                      </button>
                    </div>
                    <div className="grid grid-cols-6 gap-2 mb-2">
                      {getColorsForPage(bgColorPage, buttonColors).map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleColorSelect(color, 'background')}
                          className={`aspect-square rounded-lg border-2 transition-all ${
                            artKeyData.theme.bg_color === color.color || artKeyData.theme.bg_color === color.bg
                              ? 'border-brand-dark scale-110 shadow-lg'
                              : 'border-brand-light hover:border-brand-medium'
                          }`}
                          style={{ 
                            background: color.bg,
                            borderColor: color.color === '#ffffff' ? '#e5e7eb' : undefined
                          }}
                          title={color.label}
                        />
                      ))}
                    </div>
                    <div className="relative">
                      <input
                        type="color"
                        value={artKeyData.theme.bg_color.startsWith('#') ? artKeyData.theme.bg_color : '#F6F7FB'}
                        onChange={(e) => setArtKeyData(prev => ({
                          ...prev,
                          theme: { ...prev.theme, bg_color: e.target.value, bg_image_url: '' },
                        }))}
                        className="w-full h-12 rounded-lg border-2 border-brand-light cursor-pointer opacity-0 absolute inset-0"
                      />
                      <div className="w-full h-12 rounded-lg border-2 border-brand-light bg-white flex items-center justify-center gap-2 pointer-events-none">
                        <span>🎨</span>
                        <span className="text-sm">More Colors</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stock Photos Tab */}
                {bgTab === 'stock' && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <button
                        onClick={() => setStockBgPage(Math.max(0, stockBgPage - 1))}
                        disabled={stockBgPage === 0}
                        className="w-8 h-8 rounded border border-brand-light hover:border-brand-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        ‹
                      </button>
                      <span className="text-xs text-gray-500 flex-1 text-center">
                        {stockBgPage === 0 ? 'Nature & Sky' : stockBgPage === 1 ? 'Ocean & Beach' : stockBgPage === 2 ? 'Forest & Nature' : 'Urban & Textures'}
                      </span>
                      <button
                        onClick={() => setStockBgPage(Math.min(totalStockPages - 1, stockBgPage + 1))}
                        disabled={stockBgPage >= totalStockPages - 1}
                        className="w-8 h-8 rounded border border-brand-light hover:border-brand-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        ›
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {getCurrentStockBackgrounds().map((stock, idx) => (
                        <button
                          key={stockBgPage * stockBgPerPage + idx}
                          onClick={() => setArtKeyData(prev => ({
                            ...prev,
                            theme: { ...prev.theme, bg_image_url: stock.url, bg_image_id: stockBgPage * stockBgPerPage + idx + 1 },
                          }))}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            artKeyData.theme.bg_image_url === stock.url
                              ? 'border-brand-dark scale-105 shadow-lg'
                              : 'border-brand-light hover:border-brand-medium'
                          }`}
                          style={{ backgroundImage: `url(${stock.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                          title={stock.label}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">Page {stockBgPage + 1} of {totalStockPages}</p>
                  </div>
                )}

                {/* Upload Tab */}
                {bgTab === 'upload' && (
                  <div className="border-2 border-dashed border-brand-light rounded-xl p-8 text-center">
                    <div className="text-5xl mb-4">📤</div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundUpload}
                      className="hidden"
                      id="bg-upload"
                    />
                    <label
                      htmlFor="bg-upload"
                      className="inline-block bg-brand-medium text-white px-6 py-3 rounded-full font-semibold cursor-pointer hover:bg-brand-dark transition-all"
                    >
                      Upload Background
                    </label>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 10MB</p>
                  </div>
                )}

                {artKeyData.theme.bg_image_url && (
                  <button
                    onClick={() => setArtKeyData(prev => ({
                      ...prev,
                      theme: { ...prev.theme, bg_image_url: '', bg_image_id: 0 },
                    }))}
                    className="w-full mt-3 px-4 py-2 border-2 border-brand-light rounded-lg hover:bg-brand-lightest transition-all"
                  >
                    Clear Background Image
                  </button>
                )}
              </div>
            )}

            {/* Step 2: Add Title (and Title Color for custom mode only) */}
            {designMode !== null && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-medium text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <h3 className="text-xl font-bold text-brand-darkest font-playfair">
                    {designMode === 'template' ? 'Add Your Title' : 'Add Your Title and Title Color'}
                  </h3>
                </div>
                <input
                  type="text"
                  value={artKeyData.title}
                  onChange={(e) => setArtKeyData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none mb-4"
                  placeholder="Enter your title..."
                />
                
                {/* Title Color - Only show for custom mode */}
                {designMode === 'custom' && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-brand-darkest mb-2">Title Color</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() => setTitleColorPage(Math.max(0, titleColorPage - 1))}
                        disabled={titleColorPage === 0}
                        className="w-8 h-8 rounded border border-brand-light disabled:opacity-50"
                      >
                        ‹
                      </button>
                      <span className="text-xs text-gray-500 flex-1 text-center">
                        {titleColorPage === 0 ? 'Solid Colors' : titleColorPage === 1 ? 'Light & Pastel Gradients' : titleColorPage === 2 ? 'Vibrant Gradients' : 'Dark Gradients'}
                      </span>
                      <button
                        onClick={() => setTitleColorPage(Math.min(3, titleColorPage + 1))}
                        disabled={titleColorPage === 3}
                        className="w-8 h-8 rounded border border-brand-light disabled:opacity-50"
                      >
                        ›
                      </button>
                    </div>
                    <div className="grid grid-cols-6 gap-2 mb-2">
                      {getColorsForPage(titleColorPage, buttonColors).map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleColorSelect(color, 'title')}
                          className={`aspect-square rounded-lg border-2 transition-all ${
                            artKeyData.theme.title_color === color.color || 
                            (color.type === 'gradient' && artKeyData.theme.title_color.includes(color.bg.match(/#[0-9a-fA-F]{6}/)?.[0] || ''))
                              ? 'border-brand-dark scale-110 shadow-lg'
                              : 'border-brand-light hover:border-brand-medium'
                          }`}
                          style={{ 
                            background: color.bg,
                            borderColor: color.color === '#ffffff' ? '#e5e7eb' : undefined
                          }}
                          title={color.label}
                        />
                      ))}
                    </div>
                    <div className="relative">
                      <input
                        type="color"
                        value={artKeyData.theme.title_color.startsWith('#') ? artKeyData.theme.title_color : '#4f46e5'}
                        onChange={(e) => setArtKeyData(prev => ({
                          ...prev,
                          theme: { ...prev.theme, title_color: e.target.value },
                        }))}
                        className="w-full h-12 rounded-lg border-2 border-brand-light cursor-pointer opacity-0 absolute inset-0"
                      />
                      <div className="w-full h-12 rounded-lg border-2 border-brand-light bg-white flex items-center justify-center gap-2 pointer-events-none">
                        <span>🎨</span>
                        <span className="text-sm">More Colors</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Font Selector */}
                <div>
                  <label className="block text-sm font-semibold text-brand-darkest mb-2">Font</label>
                  <select
                    value={artKeyData.theme.font}
                    onChange={(e) => setArtKeyData(prev => ({
                      ...prev,
                      theme: { ...prev.theme, font: e.target.value },
                    }))}
                    className="w-full px-4 py-3 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                  >
                    {fonts.map(font => (
                      <option key={font.value} value={font.value}>{font.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Choose ArtKey Features and Colors */}
            {designMode !== null && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-medium text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-darkest font-playfair">Choose ArtKey Features and Colors</h3>
                    <p className="text-xs text-gray-500">Pick your button color. Drag to reorder buttons.</p>
                  </div>
                </div>

                {/* Button Colors - Now at top */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-semibold mb-3">🎨 Button Color</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => setButtonColorPage(Math.max(0, buttonColorPage - 1))}
                      disabled={buttonColorPage === 0}
                      className="w-8 h-8 rounded border border-brand-light disabled:opacity-50"
                    >
                      ‹
                    </button>
                    <span className="text-xs text-gray-500 flex-1 text-center">
                      {buttonColorPage === 0 ? 'Solid Colors' : buttonColorPage === 1 ? 'Gradients: Cool' : buttonColorPage === 2 ? 'Gradients: Warm' : 'Gradients: Dark'}
                    </span>
                    <button
                      onClick={() => setButtonColorPage(Math.min(3, buttonColorPage + 1))}
                      disabled={buttonColorPage === 3}
                      className="w-8 h-8 rounded border border-brand-light disabled:opacity-50"
                    >
                      ›
                    </button>
                  </div>
                  <div className="grid grid-cols-6 gap-2 mb-2">
                    {getColorsForPage(buttonColorPage, buttonColors).map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleColorSelect(color, 'button')}
                        className={`aspect-square rounded-lg border-2 transition-all ${
                          artKeyData.theme.button_color === color.color || artKeyData.theme.button_gradient === color.bg
                            ? 'border-brand-dark scale-110 shadow-lg'
                            : 'border-brand-light hover:border-brand-medium'
                        }`}
                        style={{ 
                          background: color.bg,
                          borderColor: color.color === '#ffffff' ? '#e5e7eb' : undefined
                        }}
                        title={color.label}
                      />
                    ))}
                  </div>
                  <div className="relative">
                    <input
                      type="color"
                      value={artKeyData.theme.button_color.startsWith('#') ? artKeyData.theme.button_color : '#667eea'}
                      onChange={(e) => setArtKeyData(prev => ({
                        ...prev,
                        theme: { ...prev.theme, button_color: e.target.value, button_gradient: '' },
                      }))}
                      className="w-full h-10 rounded-lg border-2 border-brand-light cursor-pointer opacity-0 absolute inset-0"
                    />
                    <div className="w-full h-10 rounded-lg border-2 border-brand-light bg-white flex items-center justify-center gap-2 pointer-events-none">
                      <span>🎨</span>
                      <span className="text-sm">More Colors</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <span className="text-xs text-blue-800">Tip: Click to toggle on/off. Drag to reorder buttons.</span>
                </div>
                <div className="space-y-2">
                {featureDefs.map((feature, index) => (
                  <div
                    key={feature.key}
                    draggable
                    onDragStart={() => handleFeatureDragStart(index)}
                    onDragOver={(e) => handleFeatureDragOver(e, index)}
                    onDragEnd={handleFeatureDragEnd}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-grab active:cursor-grabbing ${
                      artKeyData.features[feature.field as keyof typeof artKeyData.features]
                        ? 'border-brand-dark bg-brand-light'
                        : 'border-brand-light hover:border-brand-medium'
                    } ${draggedFeature === index ? 'opacity-50 scale-105' : ''}`}
                    onClick={() => toggleFeature(feature.field)}
                  >
                    <div className="text-gray-400 cursor-grab">⋮⋮</div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      artKeyData.features[feature.field as keyof typeof artKeyData.features]
                        ? 'border-brand-dark bg-brand-dark'
                        : 'border-gray-300'
                    }`}>
                      {artKeyData.features[feature.field as keyof typeof artKeyData.features] && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <span className="flex-1 text-sm font-medium">{feature.label}</span>
                  </div>
                ))}
                </div>
              </div>
            )}

            {/* Step 4: Custom Links */}
            {designMode !== null && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-medium text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-darkest font-playfair">Share Your Interests</h3>
                    <p className="text-xs text-gray-500">Add custom buttons to your ArtKey page</p>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Button Name</label>
                  <input
                    type="text"
                    value={newLinkLabel}
                    onChange={(e) => setNewLinkLabel(e.target.value)}
                    placeholder="Button name"
                    className="w-full px-3 py-2 border border-brand-light rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">URL</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔗</span>
                    <input
                      type="url"
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      placeholder="https://www.example.com"
                      className="flex-1 px-3 py-2 border border-brand-light rounded-lg text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddLink}
                  className="w-full px-4 py-2 border-2 border-brand-light rounded-lg hover:bg-brand-lightest transition-all text-sm font-medium"
                >
                  + Add Button
                </button>
                </div>
                {customLinks.length > 0 && (
                  <div className="space-y-2">
                    {customLinks.map((link, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm flex-1">{link.label}</span>
                        <button
                          onClick={() => handleRemoveLink(idx)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Spotify */}
            {designMode !== null && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-medium text-white rounded-full flex items-center justify-center font-bold">5</div>
                  <h3 className="text-xl font-bold text-brand-darkest font-playfair">Share Your Playlist</h3>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Playlist URL</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔗</span>
                    <input
                      type="url"
                      value={artKeyData.spotify.url}
                      onChange={(e) => setArtKeyData(prev => ({
                        ...prev,
                        spotify: { ...prev.spotify, url: e.target.value },
                      }))}
                      placeholder="https://open.spotify.com/playlist/..."
                      className="flex-1 px-3 py-2 border border-brand-light rounded-lg text-sm focus:border-brand-medium focus:outline-none"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 mt-3 text-sm">
                  <input
                    type="checkbox"
                    checked={artKeyData.spotify.autoplay}
                    onChange={(e) => setArtKeyData(prev => ({
                      ...prev,
                      spotify: { ...prev.spotify, autoplay: e.target.checked },
                    }))}
                  />
                  <span>Auto-play when page loads</span>
                </label>
              </div>
            )}

            {/* Step 6: Media Gallery */}
            {designMode !== null && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-medium text-white rounded-full flex items-center justify-center font-bold">6</div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-darkest font-playfair">Media Gallery</h3>
                    <p className="text-xs text-gray-500">Upload your images and videos</p>
                  </div>
                </div>
              
                <div className="grid grid-cols-2 gap-4">
                  {/* Images */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Images</h4>
                    {artKeyData.uploadedImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        {artKeyData.uploadedImages.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={img}
                              alt={`Upload ${idx + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => setArtKeyData(prev => ({
                                ...prev,
                                uploadedImages: prev.uploadedImages.filter((_, i) => i !== idx),
                              }))}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex-1 px-3 py-2 border border-brand-light rounded-lg hover:bg-brand-lightest transition-all text-sm text-center cursor-pointer"
                      >
                        + Upload
                      </label>
                    </div>
                  </div>

                  {/* Videos */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Videos</h4>
                    {artKeyData.uploadedVideos.length > 0 && (
                      <div className="space-y-2 mb-2">
                        {artKeyData.uploadedVideos.map((vid, idx) => (
                          <div key={idx} className="relative group">
                            <video
                              src={vid}
                              className="w-full h-20 object-cover rounded-lg"
                              controls
                            />
                            <button
                              onClick={() => setArtKeyData(prev => ({
                                ...prev,
                                uploadedVideos: prev.uploadedVideos.filter((_, i) => i !== idx),
                              }))}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={handleVideoUpload}
                        className="hidden"
                        id="video-upload"
                      />
                      <label
                        htmlFor="video-upload"
                        className="flex-1 px-3 py-2 border border-brand-light rounded-lg hover:bg-brand-lightest transition-all text-sm text-center cursor-pointer"
                      >
                        + Upload
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: ArtKey Settings - Only show if features are enabled */}
            {designMode !== null && (artKeyData.features.show_guestbook || artKeyData.features.enable_gallery || artKeyData.features.enable_video || artKeyData.features.enable_featured_video) && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-medium text-white rounded-full flex items-center justify-center font-bold">7</div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-darkest font-playfair">ArtKey Settings</h3>
                    <p className="text-xs text-gray-500">Configure your enabled features</p>
                  </div>
                </div>

                {/* Guestbook Settings */}
                {artKeyData.features.show_guestbook && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold mb-3">📖 Guestbook Settings</h4>
                    <div className="space-y-4">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={artKeyData.features.gb_btn_view}
                          onChange={(e) => setArtKeyData(prev => ({
                            ...prev,
                            features: { ...prev.features, gb_btn_view: e.target.checked },
                          }))}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span>Allow guests to view the Guestbook</span>
                      </label>
                      
                      {/* Signing Status */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">Signing Status</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setArtKeyData(prev => ({
                              ...prev,
                              features: { ...prev.features, gb_signing_status: 'open' },
                            }))}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              artKeyData.features.gb_signing_status === 'open'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            ✅ Open
                          </button>
                          <button
                            type="button"
                            onClick={() => setArtKeyData(prev => ({
                              ...prev,
                              features: { ...prev.features, gb_signing_status: 'closed' },
                            }))}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              artKeyData.features.gb_signing_status === 'closed'
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            🚫 Closed
                          </button>
                          <button
                            type="button"
                            onClick={() => setArtKeyData(prev => ({
                              ...prev,
                              features: { ...prev.features, gb_signing_status: 'scheduled' },
                            }))}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              artKeyData.features.gb_signing_status === 'scheduled'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            📅 Scheduled
                          </button>
                        </div>
                      </div>

                      {/* Date Range - Only show when scheduled */}
                      {artKeyData.features.gb_signing_status === 'scheduled' && (
                        <div className="grid grid-cols-2 gap-3 p-3 bg-blue-50 rounded-lg">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                            <input
                              type="datetime-local"
                              value={artKeyData.features.gb_signing_start}
                              onChange={(e) => setArtKeyData(prev => ({
                                ...prev,
                                features: { ...prev.features, gb_signing_start: e.target.value },
                              }))}
                              className="w-full px-2 py-1.5 border border-brand-light rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                            <input
                              type="datetime-local"
                              value={artKeyData.features.gb_signing_end}
                              onChange={(e) => setArtKeyData(prev => ({
                                ...prev,
                                features: { ...prev.features, gb_signing_end: e.target.value },
                              }))}
                              className="w-full px-2 py-1.5 border border-brand-light rounded-lg text-sm"
                            />
                          </div>
                        </div>
                      )}

                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={artKeyData.features.gb_require_approval}
                          onChange={(e) => setArtKeyData(prev => ({
                            ...prev,
                            features: { ...prev.features, gb_require_approval: e.target.checked },
                          }))}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span>🛡️ Require approval before entries appear</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Image Gallery Settings */}
                {artKeyData.features.enable_gallery && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold mb-3">📸 Image Gallery Settings</h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={artKeyData.features.allow_img_uploads}
                          onChange={(e) => setArtKeyData(prev => ({
                            ...prev,
                            features: { ...prev.features, allow_img_uploads: e.target.checked },
                          }))}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span>Allow guests to upload images</span>
                      </label>
                      {artKeyData.features.allow_img_uploads && (
                        <div className="ml-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-amber-800">
                            <span>🛡️</span>
                            <span className="font-medium">Moderation enabled</span>
                          </div>
                          <p className="text-xs text-amber-700 mt-1">
                            Guest uploads will not be visible until you approve them.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Video Gallery Settings */}
                {artKeyData.features.enable_video && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold mb-3">🎥 Video Gallery Settings</h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={artKeyData.features.allow_vid_uploads}
                          onChange={(e) => setArtKeyData(prev => ({
                            ...prev,
                            features: { ...prev.features, allow_vid_uploads: e.target.checked },
                          }))}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span>Allow guests to upload videos</span>
                      </label>
                      {artKeyData.features.allow_vid_uploads && (
                        <div className="ml-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-amber-800">
                            <span>🛡️</span>
                            <span className="font-medium">Moderation enabled</span>
                          </div>
                          <p className="text-xs text-amber-700 mt-1">
                            Guest uploads will not be visible until you approve them.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Featured Video Settings */}
                {artKeyData.features.enable_featured_video && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold mb-3">▶️ Featured Video Settings</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Button Label</label>
                        <input
                          type="text"
                          value={artKeyData.featured_video.button_label}
                          onChange={(e) => setArtKeyData(prev => ({
                            ...prev,
                            featured_video: { ...prev.featured_video, button_label: e.target.value },
                          }))}
                          placeholder="e.g., Watch Video Greeting"
                          className="w-full px-3 py-2 border border-brand-light rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Upload Featured Video</h5>
                        <div className="border-2 border-dashed border-brand-light rounded-xl p-6 text-center hover:border-brand-medium transition-colors">
                          <div className="text-4xl mb-2">🎬</div>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="hidden"
                            id="featured-video-upload"
                          />
                          <label
                            htmlFor="featured-video-upload"
                            className="inline-block bg-brand-medium text-white px-4 py-2 rounded-full font-semibold cursor-pointer hover:bg-brand-dark transition-all text-sm"
                          >
                            + Upload Video
                          </label>
                          <p className="text-xs text-gray-500 mt-2">MP4, MOV, WebM up to 100MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ArtKey Selector Modal */}
      {showArtKeySelector && (
        <ArtKeySelector
          sessionId={getSessionId()}
          onSelect={(artKey) => loadExistingArtKey(artKey.id)}
          onCancel={() => setShowArtKeySelector(false)}
          currentArtKeyId={currentArtKeyId}
        />
      )}
    </div>
  );
}
