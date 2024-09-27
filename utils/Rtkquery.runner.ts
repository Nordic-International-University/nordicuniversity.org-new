import {AppDispatch, AppStore, RootState} from "@/lib/store/Store";

export async function RtkQueryRunner(
    store: AppStore,
    params: string,
    apiType: any,
) {
    const dispatch = store.dispatch as AppDispatch;

    await dispatch(apiType.endpoints.getPosts.initiate(params));

    const {data} =
    (store.getState() as RootState).api.queries[
        `getPosts(${JSON.stringify(params)})`
        ] || {};

    return data;
}
