import React from 'react';
import { Container, Grid, List, Icon, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#024731', flexShrink: 0 };
    return (
      <footer style={divStyle}>
        <Grid columns={3} relaxed container style={{ marginTop: 0, marginBottom: 0 }}>
          <Grid.Column width={5}>
            <Header as={'h3'} inverted>INFORMATION</Header>
            <hr/>
            <List size={'large'} inverted>
              <List.Item><a href={'/#/about'}><Icon name={'users'}/> About Us
              </a></List.Item>
              <List.Item><a href={'/#/terms'}><Icon name={'file'}/> Terms & Conditions</a></List.Item>
              <List.Item>
                <a href={'/#/privacy'}><Icon name={'privacy'}/> Privacy Policy</a>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={1}/>
          <Grid.Column width={5}>
            <Header as={'h3'} inverted>SUPPORT</Header>
            <hr/>
            <List size={'large'} inverted>
              <List.Item><a href={'/#/contact'}><Icon name={'mail'}/> Contact Us</a></List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={1}/>
          <Grid.Column width={4} textAlign={'left'}>
            {this.props.currentUser ? (
              <Header as={'h3'} inverted>Welcome {this.props.currentUser}!</Header>
            ) : (
              <Container>
                <Header as={'h3'} inverted>NOT A MEMBER?</Header>
                <Button
                  content={'REGISTER'}
                  size={'small'}
                  style={{ color: 'white', backgroundColor: '#8EA4D2' }}
                  as={NavLink}
                  exact to={'/volunteer_signup'}/>
              </Container>
            )}
          </Grid.Column>
        </Grid>
      </footer>
    );
  }
}

/** Declare the types of all properties. */
Footer.propTypes = {
  currentUser: PropTypes.string,
};

const FooterContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Footer);

export default withRouter(FooterContainer);
