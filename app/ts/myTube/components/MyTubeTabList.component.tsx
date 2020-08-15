import * as React from "react";
import {Link} from "react-router-dom";
import MyTubeRoutePathCollection from "../../common/constants/MyTubeRoutePathCollection";
import {RouteComponentProps, withRouter} from "react-router";

class MyTubeTabList extends React.Component<RouteComponentProps>{
    constructor(props: RouteComponentProps) {
        super(props);
    }

    private getTabs(): React.ReactNode{
        const tabs: React.ReactNode[] = [];

        tabs.push(this.getTab(MyTubeRoutePathCollection.INDEX, 'All'));
        tabs.push(this.getTab(MyTubeRoutePathCollection.FAVORITE, 'Favorite'));

        return tabs;

    }

    private getTab(path: MyTubeRoutePathCollection, text: string): React.ReactNode{
        return (
            <Link
                to={path}
                className={`myTube-tab-list-item ${this.getActiveClassname(path)}`}
            >
                {text}
            </Link>
        );

    }

    private getActiveClassname(path: MyTubeRoutePathCollection): string {
        if (this.isCurrentPath(path)) {
            return 'active';
        }

        return '';
    }

    private isCurrentPath(path: MyTubeRoutePathCollection): boolean {
        return this.props.location.pathname === path;
    }

    render() {
        return(
            <div className="myTube-tab-list">
                {this.getTabs()}
            </div>
        );
    }
}

const MyTubeTabListWithRouter = withRouter(MyTubeTabList);

export default MyTubeTabListWithRouter;
