import React from "react";
import ReactDOM from "react-dom";
import Paper from 'material-ui/Paper';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppHeader from "./AppHeader.jsx";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Router,Route,hashHistory,Link} from "react-router";

const style = {
	width: "100%",
	textAlign: 'center',
	display: 'inline-block',
	padding: 10
};

const cardStyle = {
	width: "100%",
	textAlign: 'center',
	display: 'inline-block',
	padding: 10,
	color: "rgb(0,0 ,0)"
};

const muiTheme = getMuiTheme({
	palette: {
		textColor: cyan500,
	},
});

var ServicesList=React.createClass({
	render(){
		var services = this.props.data.map(function(data, key){
			return(
				<div>
				<Card style={cardStyle}>
				<h5>Service Name: {data.serviceName}</h5>
				<h5>Replicas: {data.replicas}</h5>
				</Card>
				</div>
				);
		})
		return(
			<div>
			{services}
			</div>				
			);
	}
});

var AppId=React.createClass({
	getInitialState() {
		return {
			data:[],
			app_id:''
		};
	},

	componentDidMount() {
		this.setState({app_id:this.props.params.appId}),
		$.ajax({
			url: 'http://localhost:8080/deployedAppDetails',
			dataType: 'json',
			type: 'GET',
			success: function(data){
				console.log("successful",data);
				this.setState({data: data});
			}.bind(this)
		})
	},
	
	render() {
		var data = this.state.data.length>0? this.state.data : "Loading";
		console.log(data)
		var deployedApps=this.state.data.map(function(data,key){
			console.log("app id is",this.state.app_id);			
			return(
				data._id == this.state.app_id ? <MuiThemeProvider muiTheme={muiTheme}>
				<div>
				<AppHeader />
				<ServicesList data={data.services}/>					
				</div>
				</MuiThemeProvider>: null
				)
		}.bind(this));
		return (
			data == "Loading" ? null:  <div> {deployedApps} </div> 
			);
	}
});

module.exports=AppId;