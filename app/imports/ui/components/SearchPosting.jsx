import _ from 'lodash';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Search, Grid, Container, Loader, Card, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';

import PropTypes from 'prop-types';
import { Events } from '../../api/event/EventCollection';

const initialState = {
  results: [],
  value: '',
};

class SearchPosting extends React.Component {

  constructor(props) {
    super(props);
    this.state = { results: [], value: '' };
  }

  resultRenderer = ({ name, skills, place, image }) => <PositionResult name={name} skills={skills} place={place} image={image}/>

  handleSearchChange = (e, data) => {
    this.setState({ loading: true, value: data.value });
    if (data.value.length === 0) {
      this.setState(initialState);
      return;
    }

    const re = new RegExp(_.escapeRegExp(data.value), 'i');
    const isMatch = (result) => re.test(result.name) || re.test(result.skills) || re.test(result.place);

    this.setState({
      loading: false,
      results: _.filter(this.props.positions, isMatch),
    });
  }

  onResultSelect = (e, data) => {
    this.setState({ value: data.result.name });
    const re = new RegExp(_.escapeRegExp(data.result.name), 'i');
    const isMatch = (result) => re.test(result.name);

    this.setState({
      loading: false,
      results: _.filter(this.props.positions, isMatch),
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { results, value } = this.state;

    return (
      <div id='searchpage' className='search-background'>
        <Grid container centered>
          <Grid.Column>
            <Search id='searchbar' placeholder='Search for any position, location, or skill!'
              onResultSelect={this.onResultSelect}
              onSearchChange={this.handleSearchChange}
              resultRenderer={this.resultRenderer}
              results={results}
              value={value}
            />

            <Container align='center' id='results'>
              <Label id='yours' size='huge' circular color='teal' >Your Results</Label>
              <Card.Group centered>
                {results.map((positions) => <Position key={positions._id} position={positions} favorites={this.props.favorites.filter(favorite => (favorite.positionID === positions._id))}/>)}
              </Card.Group>
              <Label id='postings' size='huge' circular color='teal' >Postings</Label>
              <Card.Group centered>
                {this.props.positions.map((positions) => <Position key={positions._id} position={positions} favorites={this.props.favorites.filter(favorite => (favorite.positionID === positions._id))}/>)}
              </Card.Group>
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

SearchPosting.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Position documents.
  const subscription = Events.subscribe();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Position documents
  const events = Event.collection.find({}).fetch();
  return {
    events,
    ready,
  };
})(SearchPosting);
