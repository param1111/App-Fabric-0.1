import React from 'react';
import ReactDOM from 'react-dom';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import DeploymentCard from "./deploymentCard.jsx";
import Login from "./Login.jsx";
//App Bar 
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Router,Route,hashHistory,Link} from "react-router";

const styles = {
    paperstyle: {
        width: "100%",
        margin: '10px',
        textAlign: 'center',
        display: 'inline-block',
        padding: '30px'
    }
};

const muiTheme = getMuiTheme({
   palette: {
       textColor: cyan500,
   },
});

const style = {
   margin: 12,
};

 const btnstyle={
    width:"80%"
 }
var DashBoard = React.createClass({
   signOut: function(){

      document.cookie = 'JWT' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
   },
   getInitialState: function() {
       return { gitRepositoryURL: '',
       clicked:false,
       socket: window.io(),
       clone : {isComplete: false,isInProgress: false },
       deploy : {isComplete: false,isInProgress: false },
       branchName: '',
       cookieStatus: false };
   },
   componentWillMount: function(){
      if(document.cookie){
        this.setState({cookieStatus:true})
      }
      else if(document.cookie.length == 0){
        this.setState({cookieStatus:false})
      }
   },
   handleGitUrlChange: function(event) {
       this.setState({ gitRepositoryURL: event.target.value });
       console.log(event.target.value)
   },
   handlebranchChange: function(event){
      this.setState({branchName: event.target.value});

   },

   cloneRepository: function(e) {
       e.preventDefault();
       console.log(this.state.gitRepositoryURL);
       this.setState({gitRepositoryURL: '',clicked:true});
       this.state.socket.emit("deploy", {"gitURL":this.state.gitRepositoryURL} , {"gitBranch" : this.state.branchName});
       this.state.socket.on("clone",function(data){
         this.setState({clone: data});
       }.bind(this));
       this.state.socket.on("deploy",function(data){
        this.setState({deploy : data});
       }.bind(this));
   },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentDidMount: function () {

      if (!this.state.cookieStatus){
          this.context.router.push('/')
      }
    },

   render: function() {
             return (
                 <MuiThemeProvider muiTheme={muiTheme}>
                   <div>
                                  <AppBar
                                    title="App Fabric"
                                    iconElementLeft={<IconButton></IconButton>}
                                    iconElementRight={
                                      <IconMenu
                                        iconButtonElement={
                                          <IconButton><MoreVertIcon /></IconButton>
                                        }
                                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                      >



                                      <Link to="/" >
                                        <MenuItem primaryText="Sign out" onClick={this.signOut}></MenuItem>

                                        </Link>
                                      </IconMenu>
                                    }
                                  />
                                  <Paper style={styles.paperstyle}>

                                       <form onSubmit = { this.cloneRepository } >
                                           <TextField
                                                fullWidth={true}
                                               type = "text"
                                               hintText="Enter GIT URL"
                                               floatingLabelText="GIT URL"
                                               value = { this.state.gitRepositoryURL }
                                               onChange = { this.handleGitUrlChange }
                                               name = "gitURL"
                                               />
                                                <TextField                   
                                               type = "text"
                                               hintText="(default)"
                                               floatingLabelText="Branch Name (default)"
                                               value = { this.state.branchName }
                                               onChange = { this.handlebranchChange }
                                               name = "gitURL"
                                               />
                                            <RaisedButton label="Primary" primary={true} style={btnstyle} label="Deploy" secondary={true} style={style} type = "submit" disabled={!this.state.gitRepositoryURL} />
            								<RaisedButton label="Primary" primary={true} style={btnstyle} label="Service log" secondary={true} style={style} type = "button" href="/log/app-fabric"/>
                                       </form >
                                    </Paper>
                                   {this.state.clicked?<DeploymentCard clone={this.state.clone} deploy={this.state.deploy} />:null}
            						          <h3 align="left"><a href="/log/app-fabric" style={{bottom:'10px',textAlign:'left'}}>Click here to see service log</a></h3>
                      </div>
                 </MuiThemeProvider>
             );

   }
})

var App = React.createClass({
   render: function() {
       return <DashBoard />
   }
});

module.exports=DashBoard;
