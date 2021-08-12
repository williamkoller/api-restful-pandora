import { ReturnMessageType } from '@/utils/types/return-message/return-message.type';

export interface DeleteRoleRepository {
  deleteRole: (id: string) => Promise<ReturnMessageType>;
}
