import * as React from "react";
import { Link } from "react-router-dom";
import MyTubeRoutePathCollection from "../../common/constants/MyTubeRoutePathCollection";

export interface SidebarItemProps {
    routePath: MyTubeRoutePathCollection;
    text: string
}

class FavoritePageLink extends React.Component<SidebarItemProps>{

    render() {
        return(
            <Link
                to={this.props.routePath}
                className="favorite-page-link"
            >
                {this.props.text}
            </Link>
        );
    }
}

export default FavoritePageLink;
