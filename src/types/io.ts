import type { Socket } from 'socket.io-client';
import type { ChatResponse, IMessage, IUser } from '@/types';

export type SocketTyped = Socket<ServerToClientEvents, ClientToServerEvents>;

interface ServerToClientEvents {
  'chat:message': (msg: IMessage) => void;
  'chat:messages-delete': (chatId: string, msgIds: string[]) => void;
  'chat:typing': (chat_id: string, user_name: string, user_id: string) => void;
  'chat:read-message': (chat_id: string, user_id: string) => void;
  'chat:invite-to-group': (chat: ChatResponse) => void;
  'chat:kick-from-group': (chat_id: string) => void;
  'chat:user-status': (user_id: string, status: 'online' | 'offline') => void;
  'chat:call': (chatId: string) => void;
  'chat:call-answer': (chatId: string, answer: boolean) => void;
  'chat:call-cancel': () => void;
  'chat:create': (chat: ChatResponse) => void;
  'chat:create-group': (chat: ChatResponse) => void;
  'webrtc:add-peer': (peerId: string, offer: boolean, user?: IUser) => void;
  'webrtc:remove-peer': (peerId: string) => void;
  'webrtc:sdp': (peerId: string, sdp: RTCSessionDescriptionInit) => void;
  'webrtc:ice': (peerId: string, ice: RTCIceCandidate) => void;
  'meet:create': (meetId: string) => void;
  'error:meet-join': (code: number, message: string) => void;
}

interface ClientToServerEvents {
  'chat:message': (data: { text: string; chatId: string; attachments: File[] | null }) => void;
  'chat:messages-delete': (data: { chatId: string; msgIds: string[] }) => void;
  'chat:typing': (chat_id: string, user_name: string, user_id: string) => void;
  'chat:call': (chatId: string) => void;
  'chat:call-answer': (chatId: string, answer: boolean) => void;
  'chat:call-cancel': (chatId: string) => void;
  'chat:create': (userId: string, users: string[]) => void;
  'chat:create-group': (data: { title: string; about: string; users: string[]; avatar: File | null }) => void;
  'webrtc:add-peer': (chatId: string) => void;
  'webrtc:remove-peer': (chatId: string) => void;
  'webrtc:sdp': (peerId: string, sdp: RTCSessionDescriptionInit) => void;
  'webrtc:ice': (peerId: string, ice: RTCIceCandidate) => void;
  'meet:create': (title: string) => void;
  'meet:leave': (meetId: string) => void;
  'meet:join': (meetId: string) => void;
}
