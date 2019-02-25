import * as React from 'react';
import './map.css';
import { stickMan } from './stickman';
import posed from 'react-pose';

interface IProps {
    classification: any;
    loading: boolean;
    user: any;
}

interface IState {
    static: boolean;
}

const Results = posed.div({
    enter: {
        x: 0,
        opacity: 1,
        transition:
            ({ from, to }: any) => ({
                type: 'keyframes',
                values: [1000, to],
                times: [0, 1],
                duration: 7000
            })
    },
    exit: {
        x: -1000,
        opacity: 0,
        transition: { duration: 1000 }
    }
});

class Map extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            static: false
        }
    }

    public componentDidMount() {
        setTimeout(() => this.setState({ static: true }), 5000);
    }

    public render() {
        const { loading, classification, user } = this.props;
        return (
            <div className="ibm__ngv_main">
                {loading || !classification ?
                    stickMan(`${this.state.static ? 'static walk' : 'walk in'}`)
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
