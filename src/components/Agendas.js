import React from 'react';
// import helpers from '../../utils/helpers.js';
import axios from 'axios';
import Checkbox from 'material-ui/Checkbox';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const today = new Date();
// Store the date in the string format we need for our AJAX call.
const isoString = today.toISOString();
const dateString = isoString.slice(0, 23);
// Print in easier to read format for when we render HTML

class Agenda extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      agendaItems: []
    };
  }
// This tutorial was helpful in providing a primer on HTTP requests in React
// https://daveceddia.com/ajax-requests-in-react/
  componentDidMount() {
    axios.get(`https://data.austintexas.gov/resource/b34r-kvsj.json?$where=date>='${dateString}'`)
      .then(res => {
        const agendaItems = res.data;
        agendaItems.map(obj => obj.data);
        this.setState({ agendaItems });
        console.log(this.state.agendaItems);
      });
  }

  render() {
    return (
      <div id="agenda-items">
        {this.state.agendaItems.map(agendaItem =>
          <Card key={agendaItem.row_id}>
            <CardHeader
              title={`Item No. `+agendaItem.itemnumber}
              subtitle={agendaItem.date + ' - ' + agendaItem.meetingtype}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardActions>
              <FlatButton label="Item Backup" href={agendaItem.sirelinkwithdraftbackup}/>
              <FlatButton label="Item Link" href={agendaItem.linktoclerkswebsite}/>
              <Checkbox
                label="Track Item"
                style={styles.checkbox}
                // onClick={() => this.handleClick(agendaItem)}
              />
            </CardActions>
            <CardText expandable={true}>
              {agendaItem.postinglanguage}
            </CardText>
          </Card>
        )}
      </div>
    );
  }
  //
  // handleClick(item) {
  //   console.log("CLICKED");
  //   console.log(item);
  //
  //   helpers.postSaved(item.itemnumber, item.date, item.meetingtype,
  //     item.sirelinkwithdraftbackup, item.linktoclerkswebsite)
  //     .then(function() {
  //       // console.log(item.web_url);
  //   });
  // }
}

export default Agenda;
