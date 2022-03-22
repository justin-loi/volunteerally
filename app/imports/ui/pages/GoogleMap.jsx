import React, { useEffect, useRef, ReactElement} from 'react';
import { Header } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Wrapper, Status} from "@googlemaps/react-wrapper";
import reactDom from "react-dom";

const GoogleMap = () => {
    const render = (status: Status): ReactElement => {
        if (status === Status.LOADING) return <h3>{status}</h3>;
        if (status === Status.FAILURE) return <h3>{status}</h3>;
        return null;
    }
    function MyMapComponent({center,zoom,}:{ center : google.maps.LatLngLiteral; zoom : number}) {
        const ref = useRef();

        useEffect(() => {
            new window.google.maps.Map(ref.current, {
                center,
                zoom,
            });
        });
        return <div ref={ref} id={"map"} />;
    }
    function App() {
        const center = {lat: -34.397, lng: 150.644};
        const zoom = 4;

        return (
            <Wrapper apiKey={AIzaSyD5i_tYlCxvgzgg8ivVgS6jpMJxarmAHCQ} render={render}>
                <MyMapComponent center={center} zoom={zoom}/>
            </Wrapper>
        );
    }

reactDom.render(<App/>, document.querySelector("#root"));
}

export default GoogleMap;