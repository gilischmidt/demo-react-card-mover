import CreateBoardPage from "../pages/board/CreateBoardPage";
import {Route, Switch} from 'react-router-dom'
import Error404Page from "../pages/errors/Error404Page";
import React from "react";
import BoardPage from "../pages/board/BoardPage";
import JoinBoardPage from "../pages/board/JoinBoardPage";

const routes = [
    {path: '/', component: CreateBoardPage},
    {path: '/join/:id', component: JoinBoardPage},
    {path: '/board/:id', component: BoardPage},
];

function render() {
    return routes.map((route) => (
        <Route
            key={route.path}
            path={route.path}
            exact={true}
            component={route.component}>
        </Route>
    ));
}


const renderRoutes = () => {
    return (
        <>
            <Switch>
                {render()}
                <Route path='*' component={Error404Page}/>
            </Switch>
        </>
    )
};

export {renderRoutes};