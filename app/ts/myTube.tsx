import "babel-polyfill";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import myTubeStore from "./myTube/myTubeStore";
import MyTubeMain from "./myTube/components/MyTubeMain.component";

render(
    <Provider store={myTubeStore}>
       <MyTubeMain/>
    </Provider>,
    document.getElementById("myTube"),
);
