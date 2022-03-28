import {UserModel} from './UserModal';
import {SpecialityModel, HourIntervalsModel} from './ClassifiersModel';
export interface DoctorModel<SpecialityIntefcae> {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: 'male' | 'female';
  speciality: SpecialityIntefcae;
  photo: string;
  information: string;
  rating: number;
  patients_count: number;
  experience: number;
  is_online: boolean;
  average_price: number;
}

export interface PriceOfSpecialityModel {
  id: number;
  clinic: ClinicModel;
  speciality: SpecialityModel;
  doctor: DoctorModel<number>;
  price: number;
  is_online: boolean;
}

export interface ClinicModel {
  id: number;
  name: string;
  photo?: string;
  district: number;
  longitude: string;
  latitude: string;
}

export interface ScheduleModel {
  id: number;
  clinic: ClinicModel;
  doctor: DoctorModel<SpecialityModel>;
  monday_hour_intervals: Array<HourIntervalsModel>;
  tuesday_hour_intervals: Array<HourIntervalsModel>;
  wednesday_hour_intervals: Array<HourIntervalsModel>;
  thursday_hour_intervals: Array<HourIntervalsModel>;
  friday_hour_intervals: Array<HourIntervalsModel>;
  saturday_hour_intervals: Array<HourIntervalsModel>;
  sunday_hour_intervals: Array<HourIntervalsModel>;
  for_online: boolean;
}

export interface EstimateModel {
  id: number;
  consultation: any;
  user: UserModel;
  doctor: DoctorModel<number>;
  rate: number;
  comment: string;
  created_time: string;
}
