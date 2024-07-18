type MessageProps = {
  isMine: boolean;
  content: string;
  timestamp: string;
};

type ChatRoomSummaryProps = {
  roomId: number;
  opponentName: string;
  lastMessage: string;
  lastTime: string;
  setChatIndex: (arg0: number) => void;
};
