export type userDetails = {
  id: string | undefined;
  displayName: string | null | undefined;
  email: string | null | undefined;
  photoURL: string | null | undefined;
};

export type User = {
  userDetails: userDetails | null;
};
