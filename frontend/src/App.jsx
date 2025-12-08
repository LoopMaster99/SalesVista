import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SalesPage } from './pages/SalesPage';
import './index.css'
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/sales" replace />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="*" element={<div className="text-gray-500">Page under construction</div>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
