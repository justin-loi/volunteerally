import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Meteor } from 'meteor/meteor';

const containerStyle = {
  width: '1000px',
  height: '500px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MyComponent() {
  return (
    <LoadScript
      googleMapsApiKey={Meteor.settings.public.googleMapsKEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
