import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import pic from './manan.png';

const About = () => {
  const a = useContext(noteContext);
  const imageStyle = {
    width: '15vw',
    height: '30vh',
    borderRadius: '100%',
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  }
  const containerStyle = {
    border: '1px solid black',
    padding: '20px 20px',
    backgroundColor: 'white',
    borderRadius: '2%',
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  }
  const paragraphClass = {
    margin: '30px 0px',
    fontSize: '18px'
  }
  return (
    <div className='container'>
      <h1 className='my-3 text-center'>Who Am I ?</h1>
      <div className="container d-flex " style={containerStyle}>
        <img style={imageStyle} src={pic} alt="" />
        <div className="container">
          <p style={paragraphClass}>Hello Myself <strong><u>Manan Aggarwal</u></strong> a Btech Computer Science Student Currently Studying in 3<sup>rd</sup> year in the <strong><i>JIMS College Of Engineering</i></strong>. </p>
          <p style={paragraphClass}>My area of interest is <strong><u>programming</u></strong>. I have a handon experience in C,C++,Java,JavaScript. I am currently Pursing Web Development which is primary interest and looking for the new opportunities which will be unlocked in the future for enhancing my knowledge in the technology. <br/>
          <br />
          My secondary interest is :- <strong>Machine Learning,  Cyber Security,  Artificial Intelligence  etc.</strong></p>
        </div>
      </div>
    </div>
  )
}

export default About