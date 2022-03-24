// import React, { useEffect, useRef, ReactElement, Component } from 'react';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

// eslint-disable-next-line react/prop-types
const AnyReactComponent = ({ text }) => <div>{text}</div>;
/* default values to initialize the map */
class GoogleMap extends Component {
        static defaultProps = {
          center: {
            lat: 21.44,
            lng: -157.86,
          },
          zoom: 11,
        };

        render() {
          return (
          /* The map itself in a container, adjustment to be made later */
            <div style={{ height: '100vh', width: '100%' }}>
              <GoogleMapReact
                /* api key to be hidden for now */
                bootstrapURLKeys={{ key: 'hidden' }}
                // eslint-disable-next-line react/prop-types
                defaultCenter={this.props.center}
                // eslint-disable-next-line react/prop-types
                defaultZoom={this.props.zoom}
              >
                <AnyReactComponent
                  lat={21.44}
                  lng={-157.86}
                  text = "Success"
                />
              </GoogleMapReact>
            </div>
          );
        }
}

export default GoogleMap;
