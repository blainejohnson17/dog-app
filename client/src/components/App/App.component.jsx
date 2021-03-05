import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash.noop';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
// import {} from '../../store/selectors';

const ImageUploader = () => {

  const [imgSrc, setImgSrc] = useState()
  const [imgFile, setImgFile] = useState()
  const [breed, setBreed] = useState()

  useEffect(() => {
    if(imgFile) {
      const data = new FormData() 
      data.append('file', imgFile)
      axios.post("https://dog-breed-predict.herokuapp.com/api/predictions", data)
        .then(function (response) {
          setBreed(response.data.name)
        })
    }
  }, [imgFile])

  const clearState = () => {
    setImgSrc()
    setImgFile()
    setBreed()
  }

  const handleChange = input => {
    clearState()
    if (input.target.files && input.target.files[0]) {
      setImgFile(input.target.files[0])
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  }

  return (
    <div className="container py-5">
      <header className="text-white text-center">
        <h1 className="display-4">What the Breed</h1>
        <p className="lead mb-0">Upload an image to identify breed</p>
        <br />
        <img src="https://res.cloudinary.com/mhmd/image/upload/v1564991372/image_pxlho1.svg" alt width={150} className="mb-4" />
      </header>
      <div className="row py-4">
        <div className="col-lg-6 mx-auto">
          {/* Upload image input*/}
          <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
            <input id="upload" type="file" onChange={handleChange} className="form-control border-0" />
            <label id="upload-label" htmlFor="upload" className="font-weight-light text-muted">Choose file</label>
            <div className="input-group-append">
              <label htmlFor="upload" className="btn btn-light m-0 rounded-pill px-4"> <i className="fa fa-cloud-upload mr-2 text-muted" /><small className="text-uppercase font-weight-bold text-muted">Choose file</small></label>
            </div>
          </div>
          {/* Uploaded image area*/}
          {breed && <h2 className="text-white text-center">{breed}</h2>}
          {imgSrc && <div className="image-area mt-4"><img id="imageResult" src={imgSrc} alt className="img-fluid rounded shadow-sm mx-auto d-block" /></div>}
        </div>
      </div>
    </div>
   )
}

const App = () => {
  return (
    <div className="app">
      <ImageUploader />
    </div>
  );
};

App.propTypes = {};

App.defaultProps = {};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
