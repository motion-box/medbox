export interface GlobalState {
  screen: ScreenTypes;
  os: OSTypes;
  lang: LangTypes;
  bottomTabVisible: boolean;
}

export type ScreenTypes = {
  width: number;
  height: number;
  hasNotch: boolean | undefined;
  headerSize: number | null;
};
export type OSTypes = 'android' | 'ios' | undefined;

export type LangTypes = 'en' | 'ru' | 'uz';
