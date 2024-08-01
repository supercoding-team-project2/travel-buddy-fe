interface MessageProps {
  roomId: string;
  senderId: string;
  opponentId: string;
  content: string;
  timeStamp: string;
}

interface ChatRoomSummaryProps {
  roomId: string;
  opponentName: string;
  lastMessage: string;
  lastTime: string;
  setChatRoomId: (arg0: string) => void;
}

interface ErrorProps {
  errorMessage: string;
  buttonText: string;
  nextLink: string;
}
