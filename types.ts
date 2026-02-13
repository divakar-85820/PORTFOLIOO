
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  description: string;
  tech: string[];
  link?: string;
}

// Added missing Artist interface to resolve error in ArtistCard.tsx
export interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
  day: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  PROJECTS = 'projects',
  PHILOSOPHY = 'philosophy',
  ENGAGEMENT = 'engagement',
}