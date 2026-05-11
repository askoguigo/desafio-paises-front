import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import { Details } from './pages/Details.tsx';  
export default function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'sans-serif' }}>
        <header style={{ 
          padding: '20px', 
          background: '#007bff', 
          color: 'white', 
          textAlign: 'center' 
        }}>
          <h1 style={{ margin: 0 }}>Mundo Explorer</h1>
        </header>
        
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />        </Routes>
      </div>
    </BrowserRouter>
  );
}