import React from 'react';
import { Icon } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  return (
    <footer>
      <div style={divStyle} className="ui center aligned container">
        <hr />
        <Icon name='copyright'/> 2021-2022 VolunteerAlly. All rights reserved. <br />
        <a> Privacy Policy.</a> <br />
        <a> Terms & Conditions.</a> <br />
      </div>
    </footer>
  );
};

export default Footer;
