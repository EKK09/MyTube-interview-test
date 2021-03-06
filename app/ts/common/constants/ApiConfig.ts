declare const API_KEY: string;

export interface QueryParameter {
    part: string;
    chart: string;
    videoCategoryId: string;
    key: string;
    maxResults: string;
    pageToken: string;
}
export const DEFAULT_QUERY_PARAMETER: QueryParameter = {
    part: 'id, snippet,contentDetails',
    chart: 'mostPopular',
    videoCategoryId: '17',
    key: API_KEY,
    maxResults: '50',
    pageToken: "",
};