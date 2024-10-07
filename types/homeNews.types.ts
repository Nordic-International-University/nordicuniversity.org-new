export interface homeNewsInterface {
    news: Array<{
        id: string;
        slug: string;
        body: string;
        title: string;
        description: string;
        source: {
            file_path: string;
        };
    }>;
}
