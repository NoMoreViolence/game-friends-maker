interface RequestAllGameSuccessModel {
  id: number;
  gamename: string;
  window: boolean;
  mac: boolean;
  ps: boolean;
  xbox: boolean;
  nswitch: boolean;
  android: boolean;
  ios: boolean;
  genres: string[];
}

export { RequestAllGameSuccessModel };
