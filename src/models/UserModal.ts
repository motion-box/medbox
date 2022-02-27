export type FamilyMemberModel = {
  id: string;
  name: string;
  age: number;
  imageUrl: string;
};
export type FamilyModel = Array<FamilyMemberModel>;

export type UserInfoModel = {
  bloodType: string;
  age: number;
  sex: 'male' | 'female';
  address: string;
};

export type ClinicModel = {
  name: string;
  doctor: {
    name: string;
    imageUrl: string;
    speciality: string;
  };
};

export interface UserModel {
  name: string;
  email: string;
  imageUrl: string;
  userInfo: UserInfoModel;
  family: FamilyModel;
  clinic: ClinicModel;
}

export interface UserOveralModel extends UserTypes, UserAddressType {}

export interface UserTypes {
  id: number;
  phone_number: string;
  photo: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: 'male' | 'female';
  email: string;
  allergies: idleType[];
  pathologies: idleType[];
}

export type UserAddressType = {
  latitude: string;
  longitude: string;
  district: {
    id: 0;
    region_id: string;
    name_uz: string;
    name_ru: string;
    name_en: string;
  };
  address: string;
};

type idleType = {
  id: number;
  name_uz: string;
  name_ru: string;
  name_en: string;
};

// type user = {
//   name: string;
//   email: string;
//   imageUrl: string;
//   userInfo: {
//     bloodType: string;
//     age: number;
//     sex: 'male' | 'female';
//     address: string;
//   };
//   family: {
//     id: string;
//     name: string;
//     age: number;
//     imageUrl: string;
//   }[]; // Массив так как может быть больше 1 человек
//   clinic: {
//     name: string; // Название клиники
//     doctor: {
//       name: string;
//       imageUrl: string;
//       speciality: string;
//     };
//   }
// }
