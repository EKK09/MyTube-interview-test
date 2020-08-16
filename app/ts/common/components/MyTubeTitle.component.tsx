import * as React from "react";

export interface MyTubeTitleProps {
    title: string;
}

const MyTubeTitle = (props: MyTubeTitleProps) => (
    <div className="myTube-title">
        {props.title}
    </div>
);

export default MyTubeTitle;
