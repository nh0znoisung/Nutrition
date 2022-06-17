// import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'

import  Header from './components/Header';
import  NotFound  from './components/NotFound';
import  NguyenlieuHome  from './components/NguyenlieuHome';
import  NguyenlieuAdd  from './components/NguyenlieuAdd';
import MonanAdd from './components/MonanAdd';
import MonanHome  from './components/MonanHome';
import NguyenlieuUpdate from './components/NguyenlieuUpdate';

function App() {
  return (
    <>
        <Header/>

        <Routes>
            <Route path="/" element={<NguyenlieuHome />} > </Route>
            <Route path="/nguyenlieu" element={<NguyenlieuHome />} > </Route>
            <Route path="/nguyenlieu/:id" element={<NguyenlieuUpdate />} > </Route>
            
            <Route path="/monan" element={<MonanHome />} > </Route>
            <Route path="/themnguyenlieu" element={<NguyenlieuAdd />} > </Route>
            <Route path="/themmonan" element={<MonanAdd />} > </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;
