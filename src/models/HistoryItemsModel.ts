import {SpecialityModel} from './ClassifiersModel';
import {DoctorModel, PriceOfSpecialityModel} from './DoctorModel';
import {UserModel} from './UserModal';
export interface RegisterModel {
  id: number;
  user: UserModel;
  opened_doctor: DoctorModel<number>;
  closed_doctor?: DoctorModel<number>;
  is_payment_required?: boolean;
  is_active?: boolean;
  created_time: string;
  finished_time?: string;
  last_updated_time: string;
}

export interface RegisterHistoryModel {
  [key: string]: Array<RegisterModel>;
}

export type UserRegistersModel = {
  active: Array<RegisterModel>;
  history: Array<RegisterModel>;
  last: Array<RegisterModel>;
};

export interface RegisterRequestModel {
  user: number;
  opened_doctor: number;
  is_payment_required: boolean;
  is_active: boolean;
  finish_time?: string;
}

export interface ConsultationRequestModel {
  register: number;
  speciality: number;
  doctor: number;
  price_of_speciality: number;
  is_online: boolean;
  is_payment_required: boolean;
  scheduled_time: string;
}
export interface ConsultationBodyModel {
  register?: number;
  speciality?: number;
  doctor?: number;
  price_of_speciality?: number;
  is_online?: boolean;
  is_payment_required?: boolean;
  scheduled_time?: string;
}

export interface ConsultationModel {
  id: number;
  register: RegisterModel;
  speciality: SpecialityModel;
  doctor?: DoctorModel<number>;
  price_of_speciality?: PriceOfSpecialityModel;
  conclusion?: string;
  is_online: boolean;
  is_payment_required: boolean;
  scheduled_time: string;
  created_time: string;
  last_updated_time: string;
}

export interface AnalyzesRequestModel {
  register?: number;
  service?: number;
  price_of_service_options?: number;
  doctor?: number;
  is_payment_required?: boolean;
}
export interface AnalyzesModel {
  id: number;
  register: RegisterModel;
  service: ServiceModel;
  price_of_service_options: Array<PriceOfSeriveOptionsModel>;
  doctor: DoctorModel<number>;
  results_of_service_options: ResultOfServiceOptionsModel;
  price: number;
  is_payment_required: boolean;
  created_time?: string;
}

export interface ServiceModel {
  id: number;
  name_uz: string;
  name_ru: string;
  name_en: string;
  options: Array<ServiceOptionsModel>;
}
export interface ServiceOptionsModel {
  id: number;
  service_id: string;
  name_uz: string;
  name_ru: string;
  name_en: string;
  type: number;
  for_gender: 'male' | 'female';
  normal_from: number;
  normal_to: number;
}
export interface PriceOfSeriveOptionsModel {
  id: number;
  clinic: number;
  service_option: number;
  doctor: number;
  price: number;
}

export interface ResultOfServiceOptionsModel {
  id: number;
  analyze: number;
  service_option: number;
  result: number;
  status: number;
  photo?: Array<ResultOfServiceOptionsPhotoModel>;
}

export interface ResultOfServiceOptionsPhotoModel {
  id: number;
  result_of_service_option: number;
  file: string;
}
