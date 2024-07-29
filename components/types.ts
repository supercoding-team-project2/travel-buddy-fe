interface MessageProps {
  type: string;
  sender: string;
  message: string;
}

interface ChatRoomSummaryProps {
  roomId: number;
  opponentName: string;
  lastMessage: string;
  lastTime: string;
  setChatIndex: (arg0: number) => void;
}

interface ErrorProps {
  errorMessage: string;
  buttonText: string;
  nextLink: string;
}
