import { IdeaStage } from './idea';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
  ideaId?: string;
  ideaStage?: IdeaStage;
}