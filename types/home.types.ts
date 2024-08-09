export interface RoundedInterface {
  title: string;
}

export interface VolumePropsInterface {
  volume: Array<{
    id: string;
    image: {
      file_path: string;
    };
  }>;
}

export interface homePageCardInterface {
  articles: Array<object>;
  topArticles: Array<object>;
  lastArticles: Array<object>;
}
