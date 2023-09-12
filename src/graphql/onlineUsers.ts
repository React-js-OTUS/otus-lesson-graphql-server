import { User } from '../graphql.types';

export const onlineUsers: User[] = [];

export const getOnlineUsers = (): User[] => onlineUsers;

export const addOnlineUser = (user: User) => {
  if (!onlineUsers.find((u) => u.id)) {
    onlineUsers.push(user);
  }
};
