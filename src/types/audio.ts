export type Audio = {
  url: string | number | null;
  title: string;
  currentPlayingCardId: number;
  showMiniPlayer: boolean;
  maxPlayerSize: Array<string>;
};
