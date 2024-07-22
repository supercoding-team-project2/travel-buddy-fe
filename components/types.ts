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
