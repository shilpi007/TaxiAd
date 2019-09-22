import React,{Component} from 'react';
import axios from 'axios'

export default class Upload extends Component{
    state={
        selectedFile:null
    }

    fileChangeHandler = (e) => {
        const file = e.target.files[0]
        this.setState({selectedFile:file})
    }

    uploadHandler = () => {
        const formData = new FormData()
        formData.append(
            'myFile',
            this.state.selectedFile,
            this.state.selectedFile.name
        )
        console.log(this.state.selectedFile)
        axios.post('',formData,{onUploadProgress: (ProgressEvent) =>{
           console.log("loading")
        }}).then((res)=>{
                console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return (
            <div>
                <input type="file" onChange={this.fileChangeHandler}/>
                <button onClick={this.uploadHandler}>Upload</button>
            </div>
        )
    }
}
