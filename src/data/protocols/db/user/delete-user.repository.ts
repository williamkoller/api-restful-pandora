import { ReturnMessageType } from '@/utils/types/return-message/return-message.type';

export interface DeleteUserRepository {
  deleteUser: (id: string) => Promise<ReturnMessageType>;
}
