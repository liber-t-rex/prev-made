export type Domain = 'paris' | 'fr' | 'eu';

export interface DomainConfig {
  id: Domain;
  domainName: string;
  name: string;
  glowColor: string; // The primary neon color
  glowIntensity: string; // Shadow style
  accentColor: string;
}
