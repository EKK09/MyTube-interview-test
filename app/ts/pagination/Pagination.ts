import { PageInfoJson } from "../common/jsons/VideoListJson";

class Pagination {
    public perPage: number = 12;
    public currentPage: number = 1;
    public totalPage: number = 1;
    public totalCount: number = 0;

    public loadFromPageInfoJson(json: PageInfoJson): void {
        // this.perPage = Number(json.resultsPerPage);
        this.totalCount = Number(json.totalResults);
        this.totalPage = Math.ceil(this.totalCount / this.perPage);
    }
}

export default Pagination;
