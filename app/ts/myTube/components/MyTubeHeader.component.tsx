import * as React from "react";
import MyTubeTabListWithRouter from "./MyTubeTabList.component";

class MyTubeHeader extends React.Component{
    private getTitle(): React.ReactNode{
        return (
            <div className="myTube-header-title">
                <span className="title first">My</span>
                <span className="title second">Tube</span>
            </div>
        );

    }

    render() {
        return(
            <div className="myTube-header">
                {this.getTitle()}
                <MyTubeTabListWithRouter/>
            </div>
        );
    }
}

export default MyTubeHeader;
