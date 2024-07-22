interface MessageProps {
  isMine: boolean;
  content: string;
  timestamp: string;
}

interface ChatRoomSummaryProps {
  roomId: number;
  opponentName: string;
  lastMessage: string;
  lastTime: string;
  setChatIndex: (arg0: number) => void;
}

interface MessageProps {
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  currentUser: string;
  opponentProfile: string;
}
