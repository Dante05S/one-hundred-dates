import { type AntDesign } from '@expo/vector-icons';
import { ExternalPathString } from 'expo-router';

export interface SocialNetwork {
  key: number;
  icon: keyof typeof AntDesign.glyphMap;
  href: ExternalPathString;
}

const socialNetworks: SocialNetwork[] = [
  {
    key: 1,
    icon: 'facebook-square',
    href: 'https://www.facebook.com/alejandro.bedoyasanchez?mibextid=ZbWKwL'
  },
  {
    key: 2,
    icon: 'instagram',
    href: 'https://www.instagram.com/dante05s/'
  },
  {
    key: 3,
    icon: 'linkedin-square',
    href: 'https://www.linkedin.com/in/alejandrobedoyasanchez/'
  },
  {
    key: 4,
    icon: 'github',
    href: 'https://github.com/Dante05S'
  }
];

export default socialNetworks;
