export type DoctorType = {
  name: string;
  speciality: string;
  imageUrl: string;
  rate: number;
  amount: number;
  experience: number;
  about: string;
};

export type DoctorWorkPlacesType = {
  id: number;
  name?: string;
  imageUrl?: string;
  price: string;
};

export type DoctorReviewsType = {
  average: number;
  amount: number;
  starsAmount: [number, number, number, number, number];
  users: {
    name: string;
    imageUrl: string;
    rated: number;
    date: string;
    text: string;
  }[];
};
