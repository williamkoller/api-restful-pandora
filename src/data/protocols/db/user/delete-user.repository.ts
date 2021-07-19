import { ReturnMessageUserDeleteType } from '@/utils/types/return-message-user-delete/return-message-user-delete.type';

export interface DeleteUserRepository {
  deleteUser: (id: string) => Promise<ReturnMessageUserDeleteType>;
}
