import { ChatClient } from '../clientComponent';

export default function Chat({ params }: { params: { ChatRoomId: string } }) {
  const ChatRoomId = parseInt(params.ChatRoomId, 10);
  return <ChatClient ChatRoomId={ChatRoomId} />;
}
