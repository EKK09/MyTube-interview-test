import "babel-polyfill";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import myTubeStore from "./myTube/myTubeStore";

render(
    <Provider store={myTubeStore}></Provider>,
    document.getElementById("myTube"),
);
