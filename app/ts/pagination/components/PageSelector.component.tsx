import * as React from "react";
import Pagination from "../Pagination";
import {getOrderList} from "../../common/tool/OrderListGenerator";

export interface PageSelectorProps {
    pagination: Pagination;
    handlePageChange: (page: number) => void;
}

export interface PageSelectorState {
    maxOptionCount: number;
}

class PageSelector extends React.Component<PageSelectorProps, PageSelectorState>{
    constructor(props: PageSelectorProps) {
        super(props);
        this.state = {
            maxOptionCount: 8, // 最多顯示幾個選項
        };
    }

    private getPageSelectorLis(): React.ReactNode {
        const lis = [];

        lis.push(this.getFirstPageLi());
        lis.push(this.getPrevPageLi());
        lis.push(this.getPageOptionLis());
        lis.push(this.getNextPageLi());
        lis.push(this.getLastPageLi());

        return lis;
    }

    private isFirstPage(): boolean {
        return (this.props.pagination.currentPage === 1);
    }

    private isLastPage(): boolean {
        return (this.props.pagination.currentPage === this.props.pagination.totalPage);
    }

    private getDisabledClassName(isDisabled: boolean): string {
        if (isDisabled) {
            return "disabled";
        }

        return "";
    }

    private getFirstPageLi(): React.ReactNode {
        const firstPage = 1;

        return (
            <li
                key="first-page"
                className={`page-selector-option first-page ${this.getDisabledClassName(this.isFirstPage())}`}
            >
                <a onClick={this.handlePageChange.bind(this, firstPage)}>
                    <i className="fas fa-angle-double-left" />
                </a>
            </li>
        );
    }

    private getLastPageLi(): React.ReactNode {
        const lastPage = this.props.pagination.totalPage;

        return (
            <li
                key="last-page"
                className={`page-selector-option last-page ${this.getDisabledClassName(this.isLastPage())}`}
            >
                <a onClick={this.handlePageChange.bind(this, lastPage)}>
                    <i className="fas fa-angle-double-right" />
                </a>
            </li>
        );
    }

    private getPrevPageLi(): React.ReactNode {
        const prevPage = this.props.pagination.currentPage - 1;

        return (
            <li
                key="prev-page"
                className={`page-selector-option prev-page ${this.getDisabledClassName(this.isFirstPage())}`}
            >
                <a onClick={this.handlePageChange.bind(this, prevPage)}>
                    <i className="fas fa-angle-left" />
                </a>
            </li>
        );
    }

    private getNextPageLi(): React.ReactNode {
        const nextPage = this.props.pagination.currentPage + 1;

        return (
            <li
                key="next-page"
                className={`page-selector-option next-page ${this.getDisabledClassName(this.isLastPage())}`}
            >
                <a
                    onClick={this.handlePageChange.bind(this, nextPage)}
                >
                    <i className="fas fa-angle-right" />
                </a>
            </li>
        );
    }

    private getPageOptionLis(): React.ReactNode {
        const lis = [];
        const allowPages: number[] = this.getAllowPages();

        for (const page of allowPages) {
            lis.push(
                this.getPageOptionLi(page)
            )
        }

        return lis;
    }

    private getPageOptionLi(pageNumber: number): React.ReactNode {
        return (
            <li
                key={pageNumber}
                className={`page-selector-option page ${this.getOptionActiveClassName(pageNumber)}`}
            >
                <a onClick={this.handlePageChange.bind(this, pageNumber)}>
                    {pageNumber}
                </a>
            </li>
        );
    }

    private getAllowPages(): number[] {
        const currentPage = this.props.pagination.currentPage;
        const totalPage = this.props.pagination.totalPage;
        const maxOptionCount = this.state.maxOptionCount;
        const minimumPage: number = currentPage - Math.floor(maxOptionCount/2);
        const maximumPage: number = currentPage + Math.floor(maxOptionCount/2);
        const startPage: number = minimumPage > 0? minimumPage: 1;
        const endPage: number = maximumPage < totalPage? maximumPage: totalPage;
        const allowPages = getOrderList(endPage, startPage);

        return allowPages;
    }

    private getOptionActiveClassName(option: number): string {
        if (option === this.props.pagination.currentPage) {
            return "active";
        }

        return "";
    }

    private handlePageChange(page: number): void {
        this.props.handlePageChange(page);
    }

    private getPageSelector(): React.ReactNode {
        if (this.props.pagination.totalPage === 0) {
            return null;
        }

        return (
            <ul className="page-selector">
                {this.getPageSelectorLis()}
            </ul>
        );
    }

    public render(): React.ReactNode {
        return (
            this.getPageSelector()
        );
    }
}

export default PageSelector;
