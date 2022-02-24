import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListStuff from '../pages/ListStuff';
import ListStuffAdmin from '../pages/ListStuffAdmin';
import AddOpportunity from '../pages/AddOpportunity';
import EditStuff from '../pages/EditStuff';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import ManageDatabase from '../pages/ManageDatabase';
import EventProfile from '../pages/EventProfile';
import { ROLE } from '../../api/role/Role';
// new page
import VolunteerSignUp from '../pages/VolunteerSignUp';
import AboutUs from '../pages/AboutUs';
import Privacy from '../pages/Privacy';
import TermsAndConditions from '../pages/TermsAndConditions';
import BrowseOpportunities from '../pages/BrowseOpportunities';
import OrganizationSignup from '../pages/OrganizationSignup';
import OrganizationLibrary from '../pages/OrganizationLibrary';
import VolunteerProfile from '../pages/VolunteerProfile';
import OrganizationInfo from '../pages/OrganizationInfo';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/volunteer_signup" component={VolunteerSignUp}/>
            <Route path="/browse_opportunities" component={BrowseOpportunities}/>
            <Route path="/volunteer_signup" component={VolunteerSignUp}/>
            <Route path="/organization_signup" component={OrganizationSignup}/>
            <Route path="/about_us" component={AboutUs}/>
            <Route path="/privacy" component={Privacy}/>
            <Route path="/details/:_id" component={EventProfile}/>
            <Route path="/terms" component={TermsAndConditions}/>
            <Route path="/find_volunteers" component={OrganizationLibrary}/>
            <Route path="/organization/:_id" component={OrganizationInfo}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <VolProtectedRoute path="/volunteer-profile" component={VolunteerProfile}/>
            <Route path="/eprofile" component={EventProfile}/>
            <Route path="/about_us" component={AboutUs}/>
            <Route path="/privacy" component={Privacy}/>
            <Route path="/terms" component={TermsAndConditions}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <OrgProtectedRoute path="/add" component={AddOpportunity}/>
            <ProtectedRoute path="/list" component={ListStuff}/>
            <ProtectedRoute path="/edit/:_id" component={EditStuff}/>
            <AdminProtectedRoute path="/admin" component={ListStuffAdmin}/>
            <AdminProtectedRoute path="/manage-database" component={ManageDatabase}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN);
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * OrgProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and organization role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const OrgProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isOrg = Roles.userIsInRole(Meteor.userId(), ROLE.ORGANIZATION);
      return (isLogged && isOrg) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * VolProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and volunteer role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const VolProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isVolunteer = Roles.userIsInRole(Meteor.userId(), ROLE.VOLUNTEER);
      return (isLogged && isVolunteer) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
OrgProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
VolProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
