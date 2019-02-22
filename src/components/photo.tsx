import * as React from 'react';
import './photo.css';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import history from 'src/history';
import posed, { PoseGroup } from 'react-pose';
import { stickMan } from './stickman';

interface IProps {
    classify: (imgFile: any) => any;
}

interface IState {
    openCamera: boolean;
    showText: boolean;
    static: boolean;
}

const Text = posed.div({
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

const Photo = posed.div({
    enter: {
        x: 0,
        transition:
            ({ from, to }: any) => ({
                type: 'keyframes',
                values: [1000, to],
                times: [0, 1],
                duration: 3000
            })
    },
    exit: {
        x: -1000,
        transition: { duration: 1000 }
    }
});

class PhotoCapture extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            openCamera: false,
            showText: false,
            static: false
        }
    }

    public componentDidMount() {
        this.setState({ showText: true });
        setTimeout(() => this.setState({ static: true }), 5000);
        setTimeout(() => this.setState({ openCamera: true, showText: false }), 7000);
    }

    public render() {
        return (
            <div className="ibm__ngv_main">
                {stickMan(`${this.state.static ? 'static' : 'walk in'}`)}
                <PoseGroup id="animated-form">
                    {this.state.openCamera &&
                        <Photo key="photo" className="ibm__photo_wrapper">
                            <Camera
                                onTakePhoto={(dataUri: any) => { this.onTakePhoto(dataUri); }}
                            />
                        </Photo>}
                    {this.state.showText &&
                        <Text key="photo_text" className="ibm__med-text">Let's take a selfie so I can get to know you a little better...</Text>
                    }
                </PoseGroup>
            </div>
        )
    }

    private onTakePhoto = (dataUri: any) => {
        this.props.classify(dataUri);
        const stickman = document.getElementById('stickman') as HTMLElement;
        const input = document.getElementById('animated-form') as HTMLElement;
        stickman.classList.remove('wave')
        stickman.classList.add('walk', 'static');
        input.classList.add('move', 'out');
        setTimeout(() => history.push('/map'), 5000);
    }
}
export default PhotoCapture;
