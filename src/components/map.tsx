import * as React from 'react';
import './map.css';
import posed from 'react-pose';
import { traits } from '../assets/data/traits';

interface IProps {
    classification: any;
    loading: boolean;
    user: any;
}

const Results = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 }
});

const Pill = posed.div({
    enter: {
        opacity: 1,
        transition: {
            type: 'physics',
            delay: 400
        }
    },
    exit: {
        opacity: 0,
        transition: {
            type: 'physics',
            delay: 400
        }
    }
});

class Map extends React.Component<IProps, {}> {

    public render() {
        const { loading, classification, user } = this.props;
        return (
            <div className="ibm__ngv_main">
                {loading || !classification ?
                    <h1 className="ibm__result-text">
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </h1>
                    :
                    <Results className="ibm__result-text">
                        <img className="ibm__user-image" style={{ backgroundImage: `url(${user.img})` }} />
                        <div className="ibm__user-picture-label">
                            <div className="ibm__user-name">{user.name}</div>
                            <div className="ibm__user-age">{classification.gender}</div>
                            <div className="ibm__user-age">{classification.minAge} - {classification.maxAge}</div>
                        </div>
                        {
                            Object.keys(classification).map((key: any) => {
                                const senitiments = traits[key];
                                const level = classification[key];
                                if (senitiments && senitiments[level]) {
                                    return senitiments[level].map((senitiment: string) =>
                                        (<Pill className="ibm__results-pill">
                                            {senitiment}
                                            <div className="ibm__yes-no-wrapper">
                                                <div className="ibm__no-button">
                                                    <i className="material-icons">close</i>
                                                </div>
                                                <div className="ibm__yes-button">
                                                    <i className="material-icons">check</i>
                                                </div>
                                            </div>
                                        </Pill>)
                                    )
                                }
                            })
                        }
                        <Pill className="ibm__results-pill" style={{ top: '40rem', right: '3rem', left: 'auto' }}>
                            {`I like to wear ${classification.clothing} clothing.`}
                            <div className="ibm__yes-no-wrapper">
                                <div className="ibm__no-button">
                                    <i className="material-icons">close</i>
                                </div>
                                <div className="ibm__yes-button">
                                    <i className="material-icons">check</i>
                                </div>
                            </div>
                        </Pill>
                    </Results>}
            </div>
        )
    }
}

export default Map;
