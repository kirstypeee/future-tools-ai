import * as React from 'react';
import './map.css';
import posed, { PoseGroup } from 'react-pose';
import { traits } from '../assets/data/traits';
import { IClassification, IUser, ISentiment } from 'src/types';

interface IProps {
    classification: IClassification;
    loading: boolean;
    user: IUser;
}

interface IState {
    sentiments: ISentiment[];
}

const Results = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 }
});

const Pill = posed.div({
    enter: {
        transform: 'scale(1)',
    },
    exit: {
        transform: 'scale(0)',
    }
});

class EmpathyMap extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            sentiments: this.getSentiments()
        }
    }

    public componentDidUpdate(prevProps: IProps) {
        if (this.props.classification !== prevProps.classification) {
            this.setState({ sentiments: this.getSentiments() });
        }
    }

    public render() {
        const { loading, classification, user } = this.props;
        const { sentiments } = this.state;
        return (
            <div className="ibm__ngv_main">
                {loading || !classification ?
                    <h1 key="loading" className="ibm__result-text">
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </h1>
                    :
                    <Results key="ibm__result-text" className="ibm__result-text">
                        <div className="ibm__fixed-center">
                            <img className="ibm__user-image" style={{ backgroundImage: `url(${user.img})` }} />
                            <div className="ibm__user-picture-label">
                                <div className="ibm__user-name">{user.name}</div>
                                <div className="ibm__user-age">{classification.gender}</div>
                                <div className="ibm__user-age">{classification.minAge} - {classification.maxAge}</div>
                            </div>
                        </div>
                        <div className="ibm__flex-grid">
                            {this.renderSentiments(sentiments)}
                        </div>
                    </Results>
                }
            </div>
        )
    }

    private renderSentiments(sentiments: ISentiment[]) {
        const { classification } = this.props;
        const pillArray = [];
        sentiments.map((sentiment: ISentiment) => {
            pillArray.push(<Pill key={sentiment.sentence} className="ibm__results-pill">
                {sentiment.sentence}
                <div className="ibm__yes-no-wrapper">
                    <div className="ibm__no-button" onClick={() => this.provideFeedback(sentiment, false)}>
                        <i className="material-icons">close</i>
                    </div>
                    <div className="ibm__yes-button" onClick={() => this.provideFeedback(sentiment, true)}>
                        <i className="material-icons">check</i>
                    </div>
                </div>
            </Pill>)
        });
        pillArray.push(
            <Pill key="clothing" className="ibm__results-pill">
                {`I like to wear ${classification.clothing} clothing.`}
                <div className="ibm__yes-no-wrapper">
                    <div className="ibm__no-button">
                        <i className="material-icons">close</i>
                    </div>
                    <div className="ibm__yes-button">
                        <i className="material-icons">check</i>
                    </div>
                </div>
            </Pill>)
        return <PoseGroup>{pillArray}</PoseGroup>;
    }

    private provideFeedback(sentiment: ISentiment, correct: boolean) {
        const { sentiments } = this.state;
        const newSentiments = sentiments.filter((s) => {
            return s.sentence !== sentiment.sentence;
        });
        this.setState({ sentiments: newSentiments });
    }

    private getSentiments() {
        const { classification } = this.props;
        const sentimentsArray = [] as ISentiment[];
        classification && Object.keys(classification).map((key: any) => {
            const sentiments = traits[key];
            const level = classification[key];
            if (sentiments && sentiments[level]) {
                sentiments[level].map((sentence: string) => {
                    const sentiment = { sentence, key, level };
                    sentence && sentimentsArray.push(sentiment);
                })
            }
        });
        return sentimentsArray;
    }
}

export default EmpathyMap;
