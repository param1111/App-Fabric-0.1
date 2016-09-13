import React from "react";
import ReactDOM from "react-dom";
import {Router,Route,hashHistory} from "react-router";
import Login from "./Login.jsx";
import DashBoard from "./DashBoard.jsx";

var Index=React.createClass({
    render(){
        return <Router history={hashHistory}>
            <Route path="/" component={Login}/>
            <Route path="/form" component={DashBoard}/>
        </Router>
    }

})

ReactDOM.render(<Index/>,document.getElementById('app'))