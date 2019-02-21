import * as React from 'react';
import './photo.css';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import history from 'src/history';

interface IProps {
    classify: (imgFile: any) => any;
 }

class PhotoCapture extends React.Component<IProps, {}> {

    public render() {
        return (
            <div className="ibm__ngv_main">
                <div className="ibm__photo_wrapper">
                    <div className="ibm__label">Take a photo...</div>
                    <Camera
                        onTakePhoto={(dataUri: any) => { this.onTakePhoto(dataUri); }}
                    />
                </div>
            </div>
        )
    }

    private onTakePhoto = (dataUri: any) => {
        this.props.classify(dataUri);
        history.push('/map');
    }
}

export default PhotoCapture;
