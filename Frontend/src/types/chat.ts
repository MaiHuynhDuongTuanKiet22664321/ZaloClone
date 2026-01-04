export type ChatPreview = {
  id: string;
  name: string;
  lastMsg: string;
  time?: string;
  avatar: string;
  hasDot?: boolean;
  isOfficial?: boolean;
};

export type ChatMessage = {
  id: string;
  text: string;
  fromMe: boolean;
  time?: string;
};
