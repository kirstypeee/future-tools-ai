import * as React from 'react';
import './map.css';

interface IProps {
    classification: any;
    loading: boolean;
}

class Map extends React.Component<IProps, {}> {

    public render() {
        const { loading, classification } = this.props;
        return (
            <div className="ibm__ngv_main">
                {loading || !classification ?
                    <h1 className="ibm__result-text">Loading...</h1>
                    :
                    <div className="ibm__result-text">
                        {JSON.stringify(classification, null, 2)}
                    </div>}
            </div>
        )
    }
}

export default Map;
