import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f9c6dd0a7e6349b9b0dccda403509b86',
  appName: 'Hotel TV App',
  webDir: 'dist',
  server: {
    url: 'https://f9c6dd0a-7e63-49b9-b0dc-cda403509b86.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true,
    // Android TV configuration
    useLegacyBridge: false,
    backgroundColor: '#0f172a'
  }
};

export default config;