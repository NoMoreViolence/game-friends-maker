interface Profile {
  introduce: string;
  pictureUrl: string;
  visibility: 1 | 0;
  getMyProfileStatus: 'none' | 'success' | 'pending';
}

export { Profile };
