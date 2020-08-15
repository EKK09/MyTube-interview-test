import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MyTubeRoutePathCollection from "../../common/constants/MyTubeRoutePathCollection";
import ConnectedVideoList from "../../video/containers/VideoList.container";
import ConnectedFavoriteList from "../../favorite/containers/FavoriteList.container";
import FavoritePageLink from "../../favorite/components/FavoritePageLink.component";

class MyTubeMain extends React.Component {

    public render(): React.ReactNode {
        return(
            <div className="myTube-main">
                <Router>
                    <FavoritePageLink
                        routePath={MyTubeRoutePathCollection.FAVORITE}
                        text={"收藏頁面"}
                    />

                    <FavoritePageLink
                        routePath={MyTubeRoutePathCollection.INDEX}
                        text={"首頁"}
                    />
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
