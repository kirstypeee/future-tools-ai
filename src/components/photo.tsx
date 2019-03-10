import * as React from 'react';
import './photo.css';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import history from 'src/history';
import posed, { PoseGroup } from 'react-pose';

interface IProps {
    classify: (imgFile: any) => any;
    saveData: (data: string) => any;
}

interface IState {
    openCamera: boolean;
    showText: boolean;
    static: boolean;
}

const Text = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 }
  });

const Photo = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 }
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
        setTimeout(() => this.setState({ openCamera: true, showText: false }), 5000);
    }

    public render() {
        return (
            <div className="ibm__ngv_main">
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
        this.props.saveData(dataUri);
        history.push('/map');
    }
}
export default PhotoCapture;
