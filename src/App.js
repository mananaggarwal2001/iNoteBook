import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
function App() {
  // By wrapping the whole application into the NoteState we are providing the Access of the NoteState components to all the Components of the react Components and the Sub Components which are embedded in the main components of the react to prevent  the prop drilling process etc.

  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
          </Routes>

        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
