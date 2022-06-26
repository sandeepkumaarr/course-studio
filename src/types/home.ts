export type EpisodeItems = {
  created_at: string;
  id: number;
  name: string;
  url: string;
};

export type Home = {
  EpisodeList: Array<EpisodeItems>;
  EpisodesLoading: boolean;
};
