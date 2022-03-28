export interface NewsModel {
  id: number;
  title_ru: string;
  title_uz: string;
  title_en: string;
  subtitle_ru: string;
  subtitle_uz: string;
  subtitle_en: string;
  portrait: string;
  album: string;
  body_ru: string;
  body_uz: string;
  body_en: string;
  type: 0 | 1 | 2;
  is_active: boolean;
  created_time: string;
  last_updated_time: string;
}

export interface NewsRequestModel {
  type: 0 | 1 | 2;
}
