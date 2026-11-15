import type { CSSProperties } from 'react';

/** Edit this configuration to update the website palette and shared shapes. */
export const brandTheme = {
 name: 'Lara Rose',
 colors: {
  primary: '#A53479',
  primaryHover: '#84255F',
  heading: '#452539',
  ink: '#4B3543',
  muted: '#745C6B',
  page: '#FFF8FC',
  surface: '#FFFFFF',
  rose: '#F9E8F1',
  roseStrong: '#EECFDF',
  border: '#E8D9E2',
  controlBorder: '#A28A99',
  deep: '#3F2134',
  onDark: '#FFF7FC',
  onDarkMuted: '#E7CBDB',
  white: '#FFFFFF',
  sky: '#EEF6FC',
  skyBorder: '#D9E7F0',
  blueInk: '#506B80',
  mint: '#EFF7F3',
  mintBorder: '#DCEAE2',
  forest: '#446B58',
  gold: '#896A3D',
  focus: '#CC529E',
  danger: '#A33E54',
  whatsapp: '#128C4A',
  whatsappHover: '#0B753C',
 },
 shape: { section: 28, card: 18, control: 12 },
 fonts: { heading: "'Manrope', Arial, sans-serif", body: "'Nunito', Arial, sans-serif", label: "'Comfortaa', 'Nunito', sans-serif" },
} as const;

// Server-rendered variables prevent a theme flash and require no client provider.
export const brandThemeVariables = {
 ...Object.fromEntries(Object.entries(brandTheme.colors).map(([key, value]) => [
  `--theme-${key.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase())}`, value,
 ])),
 '--theme-radius-section': `${brandTheme.shape.section}px`,
 '--theme-radius-card': `${brandTheme.shape.card}px`,
 '--theme-radius-control': `${brandTheme.shape.control}px`,
 '--theme-font-heading': brandTheme.fonts.heading,
 '--theme-font-body': brandTheme.fonts.body,
 '--theme-font-label': brandTheme.fonts.label,
} as CSSProperties;
