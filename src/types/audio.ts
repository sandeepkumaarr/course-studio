export type Audio = {
  url: string | number | null;
  title: string;
  currentPlayingCardId: number;
  showMiniPlayer: boolean;
  maxPlayerSize: Array<string>;
};

export type File = {
  title: string;
  ext: string;
  downloadUrl: string;
  mimeType: string;
  created_at: string;
  id: number;
  index: number;
};
