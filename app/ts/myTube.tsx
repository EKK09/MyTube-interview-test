import "babel-polyfill";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import myTubeStore from "./myTube/myTubeStore";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyTubeRoutePathCollection from "./common/constants/MyTubeRoutePathCollection";


render(
    <Provider store={myTubeStore}>
        <Router>
            <Switch>
                <Route
                    path={MyTubeRoutePathCollection.FAVORITE}
                    component={() => <div>favorite</div>}
                    exact
                />
                <Route
                    path={MyTubeRoutePathCollection.INDEX}
                    component={() => <div>home</div>}
                    exact
                />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("myTube"),
);
