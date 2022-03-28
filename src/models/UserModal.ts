import {SpecialityModel} from './ClassifiersModel';
import {DoctorModel, ClinicModel} from './DoctorModel';
export type FamilyMemberModel = {
  id: string;
  name: string;
  age: number;
  imageUrl: string;
};
export type FamilyModel = Array<FamilyMemberModel>;

export interface UserModel extends UserTypes, UserInfoType, UserAddressType {
  doctor: DoctorModel<SpecialityModel>;
  clinic: ClinicModel;
  in_call_doctor: any;
}

export interface UserTypes {
  id: number;
  photo: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string;
  allergies: IdleType[];
  pathologies: IdleType[];
}
export type UserInfoType = {
  blood_type: BloodType | null;
  birth_date: string;
  gender: 'male' | 'female';
};

export type UserAddressType = {
  latitude: string;
  longitude: string;
  district: string;
  address: string;
};

export type IdleType = {
  id: number;
  name_uz: string;
  name_ru: string;
  name_en: string;
};
export type BloodType = {
  id: number;
  name: string;
};
