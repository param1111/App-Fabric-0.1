import React from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DeploymentCard from "./deploymentCard.jsx";
import BaseImageDetails from "./BaseImageDetails.jsx";

const style = {
	margin: 14,	
};

var BaseImageCard = React.createClass({
	render() {
		return(
			<div>
				<Card>
					<CardHeader
						title="Do You Require a BASE-IMAGE For Your Deployment ? "
						actAsExpander={true}
						showExpandableButton={true}
					/>
				<RaisedButton label="YES" primary={true} style={style} onClick={this.props.cloneRepositoryYes}/>
				<RaisedButton label="NO" secondary={true} style={style} onClick={this.props.cloneRepository}/>
				</Card>
			{this.props.yesClicked?<BaseImageDetails />:null}
			</div>
			);
	}
});

export default BaseImageCard;