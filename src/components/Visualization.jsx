import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { ScreenGridLayer } from '@deck.gl/aggregation-layers';
import { StaticMap } from 'react-map-gl';
import Loader from './Loader';

// Mapbox access token 
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYXdlc29tZWNoYXAiLCJhIjoiY2s3aGVicjlmMDhvcDNmcHBkc3Z6czJudiJ9.9kql8HZBhOegSKlQbVQ89w';

// Initial viewport settings
const initialViewState = {
    longitude: 10.4515, // Ideally we will detect Users location
    latitude: 51.1657,  // and set [Lat,Long] dynamically
    zoom: 6,
    pitch: 0,
    bearing: 0
};

const Visualization = (props) => {

    const [filteredTracks, setFilteredTracks] = useState([]);
    const [OHP, setOHP] = useState({});

    useEffect(() => {
        setFilteredTracks(props.tracks.filter((track) => track['STATISTICS'].hasOwnProperty(props.phenomenon)))
    }, [props]);

    const layers = [
        new ScreenGridLayer({
            id: 'screen-grid-layer',
            data: filteredTracks,
            pickable: true,
            opacity: 0.8,
            cellSizePixels: props.cellSize,
            colorRange: [
                [0, 25, 0, 25],
                [0, 85, 0, 85],
                [0, 127, 0, 127],
                [0, 170, 0, 170],
                [0, 190, 0, 190],
                [0, 255, 0, 255]
            ],
            getPosition: d => d.COORDINATES,
            getWeight: d => d.STATISTICS[props.phenomenon][props.MAM],
            onHover: (info) => {
                const tooltip = 'aggregated cell';
                // console.log(info)
                // setOHP(info);
            }
        })
    ];

    // const _renderTooltip = () => {
    //     const { object, x, y } = OHP || {};
    //     return object && (
    //         <div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', left: x, top: y }}>
    //             {object.message}
    //         </div>
    //     );
    // }

    return (
        <>
            {
                props.loading ? (
                    <Loader />
                ) : (
                        <>
                            <div className="info-panel">
                                <p> <strong>{filteredTracks.length}</strong> tracks found</p>
                            </div>
                            <DeckGL
                                initialViewState={initialViewState}
                                controller={true}
                                layers={layers}

                            >
                                {/* {_renderTooltip()} */}
                                <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
                            </DeckGL>
                        </>
                    )
            }
        </>
    )
}

export default Visualization;