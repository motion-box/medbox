export interface ActionModel {
  id: string;
  title: string;
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
}

export type ActionHistoryModel = {[key: string]: ActionModel[]};
