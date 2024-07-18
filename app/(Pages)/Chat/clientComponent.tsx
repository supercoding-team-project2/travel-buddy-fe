'use client';
import React from 'react';
import { Chat } from '../../../components/Chat/Chat/Chat';
import styles from './Chat.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export function ChatClient({ opponentId }: { opponentId: number }) {
  return <Chat opponentId={0} />;
}
