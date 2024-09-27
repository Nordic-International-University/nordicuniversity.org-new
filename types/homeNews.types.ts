export interface homeNewsInterface {
    news: Array<{
        id: string;
        body: string;
        title: string;
        description: string;
        source: {
            file_path: string;
        };
    }>;
}
