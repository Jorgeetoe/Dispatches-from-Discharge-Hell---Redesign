
export interface Story {
  id: string;
  title: string;
  author: string;
  date: string;
  preview: string;
  content: string;
  tags: string[];
  readTime: number; // in minutes
  extractionMechanism: string;
  contentTier: string;
  satiricalDevice: string;
  systemLayer: string;
  intendedReader: string;
  fixerElements: string[];
  status?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export enum AppView {
  HOME = 'HOME',
  ARCHIVE = 'ARCHIVE',
  STORY = 'STORY',
  CHECKLIST_GENERATOR = 'CHECKLIST_GENERATOR',
  LINKEDIN_GENERATOR = 'LINKEDIN_GENERATOR',
  SUBMIT = 'SUBMIT',
  ABOUT = 'ABOUT',
  FAQ = 'FAQ',
  FIELD_NOTES = 'FIELD_NOTES',
}

export interface ChecklistItem {
  category: string;
  task: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface ChecklistResponse {
  title: string;
  items: ChecklistItem[];
}

export interface BenefitLimit {
  category: string;
  limit: string;
  explanation: string;
}

export interface BenefitsAnalysis {
  summary: string;
  deductibles_and_maximums: string;
  coverage_limits: BenefitLimit[];
  red_flags: string[];
  actionable_advice: string;
}

export interface LinkedInPostResponse {
  headline: string;
  content: string;
  graphicDescription: string;
}

export interface FieldNoteCommentary {
  hasCommentary: boolean;
  text?: string;
  relatedLinks?: string[];
}

export interface FieldNoteEntry {
  id: string;
  date: string;
  source: string;
  sourceType: string;
  sourceUrl: string;
  excerpt: string;
  jorgeCommentary: FieldNoteCommentary;
}