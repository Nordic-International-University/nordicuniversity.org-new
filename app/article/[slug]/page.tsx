import { AppDispatch, makeStore } from "@/lib/store/Store";
import { articleApi } from "@/lib/query/article.query";
import ClientPage from "@/app/article/[slug]/ClientPage";
import { slugType } from "@/types/slug.types";

export async function generateMetadata({ params }: any) {
  const store = makeStore();
  const dispatch = store.dispatch as AppDispatch;

  const result = await dispatch(
    articleApi.endpoints.getBySlug.initiate(params.slug),
  );

  const { data }: any = result;
  return {
    title: data?.title || "Default Title",
    description: data?.description || "Default Description",
  };
}

export default async function ArticleDetail({ params }: any) {
  const store = makeStore();
  const dispatch = store.dispatch as AppDispatch;

  const result = await dispatch(
    articleApi.endpoints.getBySlug.initiate(params.slug),
  );

  const { data } = result;

  if (!data) {
    return <div>Article not found</div>;
  }

  return <ClientPage data={data} />;
}
