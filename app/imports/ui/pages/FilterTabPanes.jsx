import React from 'react';
import { Container, Tab } from 'semantic-ui-react';
import FilterOrganizations from '../components/filters/FilterOrganizations';
import FilterInterests from '../components/filters/FilterInterests';
import FilterEnvironments from '../components/filters/FilterEnvironments';
import FilterSkills from '../components/filters/FilterSkills';

/* Renders a list of events. Use <EventCard> to render each event card. */
const FilterTabPanes = () => (
  <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={
    // eslint-disable-next-line react/display-name
    [{ menuItem: 'Opportunities By Organization', render: () => <Tab.Pane>
      <Container>
        <FilterOrganizations/>
      </Container>
    </Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Opportunities By Interest', render: () => <Tab.Pane>
      <Container>
        <FilterInterests/>
      </Container>
    </Tab.Pane> },
    // eslint-disable-next-line react/display-name
    { menuItem: 'Opportunities By Environment', render: () => <Tab.Pane>
      <Container>
        <FilterEnvironments/>
      </Container>
    </Tab.Pane> },
    { menuItem: 'Opportunities By Special Skills', render: () => <Tab.Pane>
      <Container>
        <FilterSkills/>
      </Container>
    </Tab.Pane> },
    ]
  } />
);

export default FilterTabPanes;
