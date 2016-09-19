import React from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import ToggleRadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import DeploymentCard from "./deploymentCard.jsx";

var BaseImageDetails = React.createClass({
	getInitialState:function(){	
		return{
			imageTag:''
		};
			
	},
	contextTypes: {
    socket: React.PropTypes.object.isRequired
   },

	  handleImageChange:function(event){
	    this.setState({imageTag: event.target.value});
	    console.log(event.target.value);
	    this.context.socket.emit("image",{"imageName" : event.target.value});

  },
  

	render(){
		return(
			<Card>
				<CardHeader
			      title="Please provide the following details ? "
			      actAsExpander={true}
			      showExpandableButton={true}
			    />
			    <TextField hintText="Image Tag" 
			    floatingLabelText="Image Tag"
			    value = {this.state.imageTag} onChange = {this.handleImageChange}/>
			    <Divider />
			    
			    		     
			 </Card>

			);
	}
});

export default BaseImageDetails;