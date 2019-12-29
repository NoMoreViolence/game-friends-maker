export interface GetGameLogoUrl {
  'League Of Legends': string;
  Fortnite: string;
  OverWatch: string;
}

const imageUrls: GetGameLogoUrl = {
  'League Of Legends': '/images/icons/lol.svg',
  Fortnite: '/images/icons/fortnite.svg',
  OverWatch: '/images/icons/overwatch.svg',
};

export const getGameLogoUrl = (image: keyof GetGameLogoUrl) => imageUrls[image];
