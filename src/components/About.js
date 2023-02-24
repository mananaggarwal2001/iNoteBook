import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
    const a = useContext(noteContext);

    return (
      <>
        This is the about page in the react js for giving the description of the owner who build this page.
      </>
    )
}

export default About