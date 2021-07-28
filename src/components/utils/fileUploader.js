import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { CircularProgress } from '@material-ui/core';

class FileUpload extends Component {
    state = {
        name: '',
        isUploading: false,
        fileURL: '',
    };

    handleUploadStart = () => {
        this.setState({
            isUploading: true,
        });
    };

    handleUploadError = err => {
        this.setState({
            isUploading: false,
        });
    };

    handleUploadSuccess = filename => {
        this.setState({
            name: filename,
            isUploading: false,
        });
    };

    render() {
        console.log(this.state);
        return (
            <div>
                <div>
                    <FileUploader
                        accept='image'
                        name='image'
                        randomizeFilename
                        storageRef={firebase.storage().ref(this.props.dir)}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                    />
                </div>
            </div>
        );
    }
}

export default FileUpload;
