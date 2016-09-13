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
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionDonutLarge from 'material-ui/svg-icons/action/donut-large';
import ToggleRadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';

  const iconStyles = {
    marginRight: 24,
  };
    const style = {
        marginTop: 0,
    };
    
    var deploymentCard = React.createClass({

        render() {
          var iconsClone;
          if((!this.props.clone.isInProgress)&&(!this.props.clone.isComplete)){
                iconsClone = (
                  <ToggleRadioButtonUnchecked />
                  )
            }else if((this.props.clone.isInProgress)&&(!this.props.clone.isComplete)){
               iconsClone = (
                <CircularProgress size={0.4} style ={style}/>
                )
            }else if((this.props.clone.isComplete)&&(!this.props.clone.isInProgress)){              
                iconsClone = (
                   <ActionDone />
                   )
            }
            var iconsDeploy;            
            if((!this.props.deploy.isInProgress)&&(!this.props.deploy.isComplete)){
                iconsDeploy = (
                  <ToggleRadioButtonUnchecked />
                  )
            }else if((this.props.deploy.isInProgress)&&(!this.props.deploy.isComplete)){
              iconsDeploy = (
                <CircularProgress size = {0.4} style = {style} />
                )
            }else if((this.props.deploy.isComplete)&&(!this.props.deploy.isInProgress)){
              iconsDeploy = (
                <ActionDone />
                )
            }

            return (
              <Card>
            <CardHeader
              title="Deployment In Progress"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardActions>
                <List>
                  <ListItem primaryText="Cloning" leftIcon={iconsClone} />
                  <ListItem primaryText="Building Base-Image" leftIcon={<ActionDonutLarge />} />
                  <ListItem primaryText="Deploying" leftIcon={iconsDeploy} />
                </List>              
            </CardActions>            
         </Card>
                
            );
        }
    });
    export default deploymentCard;