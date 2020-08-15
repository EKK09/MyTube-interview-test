import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Video from "../../video/Video";
import {MyTubeState} from "../../myTube/myTubeReducer";
import {hideVideoDialogAction} from "../videoDialogActions";
import VideoDialog from "../components/VideoDialog.component";

export interface VideoDialogContainerProps extends VideoDialogStateProps {
    dispatch: Dispatch;
}

interface VideoDialogStateProps {
    isShow: boolean;
    video: Video;
}

const mapStateToProps = (state: MyTubeState): VideoDialogStateProps => ({
    isShow: state.videoDialogState.isShow,
    video: state.videoDialogState.video,
});

export class VideoDialogContainer extends React.Component<VideoDialogContainerProps>{
    constructor (props: VideoDialogContainerProps) {
        super(props);
        this.hideDialog = this.hideDialog.bind(this);
    }

    private hideDialog(): void {
        this.props.dispatch(hideVideoDialogAction());
    }

    public render(): React.ReactNode {
        if (! this.props.isShow) {
            return null;
        }

        return (
            <VideoDialog
                hideDialog={this.hideDialog}
                video={this.props.video}
            />
        );
    }
}

const ConnectedVideoDialog = connect(mapStateToProps)(VideoDialogContainer);

export default ConnectedVideoDialog;
