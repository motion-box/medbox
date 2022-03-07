export interface ActionModel {
  id: string;
  title: number;
  status: 'canceled' | 'active' | 'closed';
  created: {
    date: string;
    doctor: string;
    speciality: string;
    imageUrl: string;
  };
  finished?: {
    date: string;
    doctor: string;
    speciality: string;
    imageUrl: string;
  };
  warn?: {
    text: string;
  };
}

export type ActionHistoryModel = {[key: string]: ActionModel[]};
