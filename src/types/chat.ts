export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  suggestions?: string[];
}

export interface ChatState {
  messages: Message[];
  inputText: string;
  isLoading: boolean;
}