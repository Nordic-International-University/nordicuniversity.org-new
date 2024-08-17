interface Article {
    id: string;
    author_id: string;
    categoryId: number;
    SubCategoryId: number;
    source_id: string;
    image_id: string;
    title: string;
    abstract: string;
    description: string;
    keyword: string;
    doi: string | null;
    slug: string;
    tg_source: string | null;
    status: "ACCEPT" | "REJECT" | "PENDING";
    viewsCount: number;
    volume_id: number;
    publish_date: string | null;
    createdAt: string;
    updatedAt: string;
    category: {
        id: number;
        name: string;
        file_id: string;
        createdAt: string;
        updatedAt: string;
    };
    author: {
        id: string;
        full_name: string;
        science_degree: string;
        phone_number: string;
        password: string;
        birthday: string;
        job: string;
        OrcID: string | null;
        place_position: string;
        source_id: string | null;
        createdAt: string;
        updatedAt: string;
    };
    SubCategory: {
        id: number;
        name: string;
        categoryId: number;
        createdAt: string;
        updatedAt: string;
    };
    file: {
        id: string;
        file_path: string;
        createdAt: string;
        updatedAt: string;
    };
    image: {
        id: string;
        file_path: string;
        createdAt: string;
        updatedAt: string;
    };
    certificate: string | null;
    coAuthors: Array<any>;
}
