export interface ClassifiersModel {
  specialities: Array<SpecialityModel>;
  hourIntervals: Array<HourIntervalsModel>;
}

export interface SpecialityModel {
  id: number;
  name_ru: string;
  name_en: string;
  name_uz: string;
  description_ru: string;
  description_en: string;
  description_uz: string;
}

export interface HourIntervalsModel {
  id: number;
  hour_from: number;
  hour_to: number;
}
