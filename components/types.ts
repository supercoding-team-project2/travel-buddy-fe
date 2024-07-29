interface MessageProps {
  roomId: string;
  senderId: string;
  content: string;
  timestamp: string;
}

interface ChatRoomSummaryProps {
  roomId: number;
  opponentName: string;
  lastMessage: string;
  lastTime: string;
  setChatRoomId: (arg0: number) => void;
}

interface ErrorProps {
  errorMessage: string;
  buttonText: string;
  nextLink: string;
}
