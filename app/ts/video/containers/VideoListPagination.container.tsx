import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Pagination from "../../pagination/Pagination";
import { cloneDeep } from "lodash";
import {MyTubeState} from "../../myTube/myTubeReducer";
import PageSelector from "../../pagination/component/PageSelector.component";
import {setVideoListPaginationAction} from "../videoListAction";

export interface VideoListPaginationContainerProps extends VideoListPaginationStateProps{
    dispatch: Dispatch;
}

interface VideoListPaginationStateProps {
    pagination: Pagination;
}

const mapStateToProps = (state: MyTubeState): VideoListPaginationStateProps => ({
    pagination: state.videoListState.pagination,
});

export class VideoListPagination extends React.Component<VideoListPaginationContainerProps>{
    constructor(props: VideoListPaginationContainerProps) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    private handlePageChange(page: number): void {

        if (page === this.props.pagination.currentPage) {
            return;
        }

        const pagination = cloneDeep(this.props.pagination);
        pagination.currentPage = page;
        this.props.dispatch(setVideoListPaginationAction(pagination));
        // TODO: 載入新的影片列表
    }

    render(): React.ReactNode {
        return (
            <PageSelector
                pagination={this.props.pagination}
                handlePageChange={this.handlePageChange}
            />
        );
    }
}

const ConnectedVideoListPagination = connect(mapStateToProps)(VideoListPagination);

export default ConnectedVideoListPagination;