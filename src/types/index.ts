export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export interface Situation {
  id: string;
  name: string;
  emoji: string;
}

export type Difficulty = 'easy' | 'medium' | 'deep';

export interface ConversationFlow {
  starter: string;
  possibleResponse: string;
  followUp: string;
}

export interface TalkTopic {
  id: string;
  title: string;
  subtitle: string;
  categoryId: string;
  situations: string[];
  difficulty: Difficulty;
  starterPhrases: string[];
  conversationFlows: ConversationFlow[];
  tips: string[];
  avoidPhrases: string[];
  relatedTopicIds: string[];
}
