export interface NotificationModel {
  id: string;
  status: 'attention' | 'warning' | 'idle';
  date: string;
  doctor: string;
  speciality: string;
  imageUrl: string;
  description: string;
}
