import * as React from 'react';
import './map.css';
import posed from 'react-pose';

interface IProps {
    classification: any;
    loading: boolean;
    user: any;
}

const Text = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 }
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
                    </Results>}
            </div>
        )
    }
}

export default Map;
