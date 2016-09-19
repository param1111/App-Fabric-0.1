import React from "react";
import { Link } from "react-router";
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    width: "50%",
    margin: '100 100 100 100',
    textAlign: 'center',
    display: 'inline-block',
    padding: '30px'
};

const muiTheme = getMuiTheme({
    palette: {
        textColor: cyan500,
    },
});

var Login=React.createClass({
    render(){
        return <div>
            <MuiThemeProvider muiTheme={muiTheme}>
                <center>
                    <Paper style={style} zDepth={3} >
                        <h3>Welcome to AppFabric</h3>
                        <h4>Login with GitHub</h4>
                               <RaisedButton style={{margin:'30px 0 30px 0',textAlign:'center'}} href="https://github.com/login/oauth/authorize?client_id=06ae9c621282646f4225" label="Continue"/>
                    </Paper>
                </center>
            </MuiThemeProvider>
        </div>
    }
})

module.exports=Login;