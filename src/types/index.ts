export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  category: NewsCategoryId;
}

export type NewsCategoryId =
  | 'general'
  | 'entertainment'
  | 'sports'
  | 'tech'
  | 'lifestyle';

export interface NewsCategory {
  id: NewsCategoryId;
  name: string;
  emoji: string;
}

export interface TalkSuggestion {
  newsItem: NewsItem;
  starter: string;
  followUp: string;
  tip: string;
}

export interface SavedItem {
  id: string;
  type: 'news' | 'guide';
  title: string;
  starter: string;
  savedAt: number;
}

export type Difficulty = 'easy' | 'medium' | 'deep';

export interface ConversationFlow {
  starter: string;
  possibleResponse: string;
  followUp: string;
}

export interface GuideTopic {
  id: string;
  title: string;
  subtitle: string;
  situation: string;
  difficulty: Difficulty;
  starterPhrases: string[];
  conversationFlows: ConversationFlow[];
  tips: string[];
  avoidPhrases: string[];
}
