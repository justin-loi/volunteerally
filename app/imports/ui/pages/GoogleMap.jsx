import React from 'react';
import { Header } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Wrapper } from "@googlemaps/react-wrapper";

const MyApp = () => (
    <Wrapper apiKey={"YOUR_API_KEY"}>
        <MyMapComponent />
    </Wrapper>
);

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const GoogleMap = () => (
  <Header id={PAGE_IDS.GOOGLE_MAP} as="h2" textAlign="center">
    <p>Page not found</p>
  </Header>
);

export default GoogleMap;
