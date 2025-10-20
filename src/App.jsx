import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
// import Home from './pages/Home';
// import About from './pages/About';

function App() {
  return (
    <>
      <Header />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes> */}
      <div className="mx-auto py-8">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold">React Starter App</h1>
          <p className="mt-4">This is a simple React application using Vite.</p>
        </div>
      </div>
      <ScrollToTop />
    </>
  );
}

export default App;
