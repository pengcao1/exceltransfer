import React from 'react';
import * as axios from 'axios';
import './UploadComponent.css'


export class UploadComponent extends React.PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }

    }

    onChangeHandler = (event) => {
        // const {type, size, name} = event.target.files[0];
        // console.log("create onChangeHandler type = ", type);
        // console.log("create onChangeHandler size = ", size);
        // console.log("create onChangeHandler name = ", name);
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    onClickHandler = (e) => {
        // var data = new FormData()
        let formData = new FormData();
        formData.append('file', this.state.selectedFile)
        formData.append('name', 'caopeng')
        // debugger
        console.log(formData)
        for (let key of  formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        // console.log(this.state.selectedFile)
        axios.post("http://localhost:8000/upload", formData, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            console.log(res.statusText)
        })
    }

    render(){
        return (
            <div>
                <form ref={el => (this.form = el)}>
                    <label>I'll be an empty file:</label>
                    <input type="file" name="file" onChange={this.onChangeHandler} />
                </form>
                <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
                <p>Submit me to see what I send to the server.</p>
            </div>
        );
    }
}


