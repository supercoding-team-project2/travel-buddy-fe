import { ChatClient } from '../clientComponent';

export default function Chat({ params }: { params: { ChatRoomId: string } }) {
  return <ChatClient ChatRoomId={params.ChatRoomId} />;
}
