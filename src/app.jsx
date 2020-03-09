import React, { useEffect, useState } from 'react';
import Visualization from './components/Visualization';
import ControlBar from './components/ControlBar';
import { connect } from 'react-redux';
import { setMAM, setPhenomenon, saveTracksData } from './redux/actions';
import axios from 'axios';
import _ from 'lodash';

const App = (props) => {
    const [loading, setLoading] = useState(false);
    const [phenomenons, setPhenomenons] = useState([]);
    const url = 'https://envirocar.org/api/stable';

    useEffect(() => {
        setLoading(true);

        axios.get(`${url}/phenomenons`).then(({ data }) => {
            setPhenomenons(data.phenomenons);
        })

        axios.get(`${url}/tracks`).then(async ({ data }) => {
            const _tracksData = [];
            let promises = [];

            for (const d of data.tracks) {
                let _trackData = {};

                // At the moment only coordinates of initial point is taken into consideration
                // Ideally we will need to take all of them consideration that means from initial point to final point
                // Since it can sometimes be as large as 87 or even larger, and motive of this challenge App is to elegantly display data I didn't thought it to be useful to take all the coordinates into consideration and lad unnecessary burden on App/browser
                // But ofcourse, we will take them in consideration while working on the actual App.
                promises.push(axios.get(`${url}/tracks/${d.id}`).then(({ data }) => {
                    _trackData["ID"] = d.id;
                    _trackData["COORDINATES"] = data.features[0].geometry.coordinates;

                }))

                promises.push(axios.get(`${url}/tracks/${d.id}/statistics`).then(({ data }) => {
                    const statsObj = {};
                    data.statistics.forEach((s) => {
                        statsObj[_.camelCase(s.phenomenon.name)] = s;
                    })

                    _trackData["STATISTICS"] = { ...statsObj };
                    _tracksData.push(_trackData);
                }))


            }

            Promise.all(promises).then(() => {
                props.saveTracksData(_tracksData);
                setLoading(false);
            })

        })
    }, []);

    const updateMAM = (selectedMAMOption) => {
        props.setMAM(selectedMAMOption);
    }

    const updatePhenomenon = (selectedPhenomenon) => {
        props.setPhenomenon(selectedPhenomenon);
    }

    return (
        <>
            <Visualization loading={loading} tracks={props.tracks} MAM={props.MAM} phenomenon={props.phenomenon} cellSize={props.cellSize}/>
            <ControlBar phenomenons={phenomenons} MAM={props.MAM} phenomenon={props.phenomenon} updateMAM={updateMAM} updatePhenomenon={updatePhenomenon} />
        </>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { setMAM, setPhenomenon, saveTracksData })(App);