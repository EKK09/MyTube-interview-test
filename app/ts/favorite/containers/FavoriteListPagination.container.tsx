import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import Pagination from "../../pagination/Pagination";
import {cloneDeep} from "lodash";
import {MyTubeState} from "../../myTube/myTubeReducer";
import PageSelector from "../../pagination/components/PageSelector.component";
import {setFavoriteListPaginationAction} from "../favoriteListAction";

export interface FavoriteListPaginationContainerProps extends FavoriteListPaginationStateProps{
    dispatch: Dispatch;
}

interface FavoriteListPaginationStateProps {
    pagination: Pagination;
}

const mapStateToProps = (state: MyTubeState): FavoriteListPaginationStateProps => ({
    pagination: state.favoriteListState.pagination,
});

export class FavoriteListPagination extends React.Component<FavoriteListPaginationContainerProps>{
    constructor(props: FavoriteListPaginationContainerProps) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    private handlePageChange(page: number): void {

        if (page === this.props.pagination.currentPage) {
            return;
        }

        const pagination = cloneDeep(this.props.pagination);
        pagination.currentPage = page;
        this.props.dispatch(setFavoriteListPaginationAction(pagination));
        window.scrollTo(0, 0);
    }

    private getPageSelector(): React.ReactNode {
        if (this.props.pagination.totalCount === 0) {
            return null;
        }

        return (
            <PageSelector
                pagination={this.props.pagination}
                handlePageChange={this.handlePageChange}
            />
        );
    }

    render(): React.ReactNode {
        return this.getPageSelector();
    }
}

const ConnectedFavoriteListPagination = connect(mapStateToProps)(FavoriteListPagination);

export default ConnectedFavoriteListPagination;
