import React, {Fragment} from 'react';
import HomePage from "../pages/HomePage";
import {Route, Switch} from "react-router";
import JoinPage from "../pages/JoinPage";

const AppRoute = () => {
    return (
        <Fragment>

            <Switch>
                <Route exact path="/meet" render={(props) => <HomePage {...props} key={Date.now()} />}/>
                <Route exact path="/" render={(props) => <JoinPage {...props} key={Date.now()} />}/>
            </Switch>

        </Fragment>
    );
};

export default AppRoute;