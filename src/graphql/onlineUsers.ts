import { UserDocument } from '../models/User';

export const onlineUsers: UserDocument[] = [];

export const getOnlineUsers = (): UserDocument[] => onlineUsers;

const DAY = 1000 * 60 * 60 * 24;

export const addOnlineUser = (user: UserDocument) => {
  if (!onlineUsers.find((u) => u.id === user.id)) {
    onlineUsers.push(user);
    setTimeout(() => {
      const index = onlineUsers.findIndex((u) => u.id === user.id);
      if (index > -1) {
        onlineUsers.splice(index, 1);
      }
    }, DAY);
  }
};
