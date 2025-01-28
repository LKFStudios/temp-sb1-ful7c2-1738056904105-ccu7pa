export interface CoachingResponse {
  message: string;
  suggestions: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  suggestions?: string[];
}

export interface CoachingCategory {
  id: string;
  name: string;
  topics: string[];
  icon: string;
}

export interface CoachingTopic {
  id: string;
  categoryId: string;
  title: string;
  description: string;
}

export interface CoachingSession {
  id: string;
  userId: string;
  category: string;
  topic: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}