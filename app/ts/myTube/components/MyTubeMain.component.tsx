import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MyTubeRoutePathCollection from "../../common/constants/MyTubeRoutePathCollection";
import ConnectedVideoList from "../../video/containers/VideoList.container";
import ConnectedFavoriteList from "../../favorite/containers/FavoriteList.container";
import MyTubeHeader from "./MyTubeHeader.component";
import ConnectedVideoDialog from "../../videoDialog/containers/VideoDialog.container";

class MyTubeMain extends React.Component {

    public render(): React.ReactNode {
        return(
            <div className="myTube-main">
                <Router>
                    <MyTubeHeader/>
                    <ConnectedVideoDialog/>
                    <Switch>
                        <Route
                            path={MyTubeRoutePathCollection.FAVORITE}
                            component={ConnectedFavoriteList}
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
