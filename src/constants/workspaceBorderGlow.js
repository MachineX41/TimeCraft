/** BorderGlow — demo ayarlarıyla birebir */
export const WORKSPACE_BORDER_GLOW = {
  edgeSensitivity: 30,
  glowColor: '40 80 80',
  backgroundColor: '#120F17',
  borderRadius: 28,
  glowRadius: 40,
  glowIntensity: 1,
  coneSpread: 25,
  animated: false,
  colors: ['#c084fc', '#f472b6', '#38bdf8'],
}

/** Drawer form alanları — aynı glow, kompakt köşe yarıçapı */
export const DRAWER_FIELD_BORDER_GLOW = {
  ...WORKSPACE_BORDER_GLOW,
  borderRadius: 20,
  glowRadius: 32,
}
