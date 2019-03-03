interface Profile {
  username: string;
  introduce: string;
  pictureUrl: string;
  visibility: 1 | 0;
  actionStatus: 'none' | 'success' | 'pending';
}

export { Profile };
