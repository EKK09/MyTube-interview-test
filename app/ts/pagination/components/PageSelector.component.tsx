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
        lis.push(this.getPrevPageLi());
        lis.push(this.getFirstPageLi());
        lis.push(this.getPageOptionLis());
        lis.push(this.getLastPageLi());
        lis.push(this.getNextPageLi());

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

        if (this.props.pagination.currentPage < 6) {
            return null;
        }

        return (
            <a
                key="first-page"
                className={`page-option-list-item ${this.getDisabledClassName(this.isFirstPage())}`}
                onClick={this.handlePageChange.bind(this, firstPage)}
                href="#top"
            >
                {firstPage}
            </a>
        );
    }

    private getLastPageLi(): React.ReactNode {
        const lastPage: number = this.props.pagination.totalPage;
        const currentPage: number = this.props.pagination.currentPage;

        if (lastPage - currentPage < 10) {
            return null;
        }

        return (
            <a
                key="last-page"
                className={`page-option-list-item ${this.getDisabledClassName(this.isLastPage())}`}
                onClick={this.handlePageChange.bind(this, lastPage)}
                href="#top"
            >
                {lastPage}
            </a>
        );
    }

    private getPrevPageLi(): React.ReactNode {
        if (this.props.pagination.currentPage === 1) {
            return null;
        }

        const prevPage = this.props.pagination.currentPage - 1;

        return (
            <a
                key="prev-page"
                className={`page-option-list-item function-page ${this.getDisabledClassName(this.isFirstPage())}`}
                onClick={this.handlePageChange.bind(this, prevPage)}
                href="#top"
            >
                <i className="fas fa-angle-left" />
                Prev
            </a>
        );
    }

    private getNextPageLi(): React.ReactNode {
        const currentPage: number = this.props.pagination.currentPage;
        const lastPage: number = this.props.pagination.totalPage;

        if (currentPage === lastPage) {
            return null;
        }

        const nextPage = this.props.pagination.currentPage + 1;

        return (
            <a
                key="next-page"
                className={`page-option-list-item function-page ${this.getDisabledClassName(this.isLastPage())}`}
                onClick={this.handlePageChange.bind(this, nextPage)}
                href="#top"
            >
                Next
                <i className="fas fa-angle-right" />
            </a>
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
                className={`page-option-list-item page ${this.getOptionActiveClassName(pageNumber)}`}
                onClick={this.handlePageChange.bind(this, pageNumber)}
            >
                {pageNumber}
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
            <ul className="page-option-list">
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
