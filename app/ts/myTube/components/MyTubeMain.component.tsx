import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyTubeRoutePathCollection from "../../common/constants/MyTubeRoutePathCollection";
import ConnectedVideoList from "../../video/containers/VideoList.container";

class MyTubeMain extends React.Component {

    public render(): React.ReactNode {
        return(
            <div className="myTube-main">
                <Router>
                    <Switch>
                        <Route
                            path={MyTubeRoutePathCollection.FAVORITE}
                            component={() => <div>favorite</div>}
                            exact
                        />
                        <Route
                            path={MyTubeRoutePathCollection.INDEX}
                            component={ConnectedVideoList}
                            exact
                        />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default MyTubeMain;
