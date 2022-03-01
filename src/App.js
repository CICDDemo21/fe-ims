import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

import ReadIncidents from './components/readIncident';
import CreateIncident from './components/createIncident';
import UpdateIncident from './components/updateIncident';
import ViewIncident from './components/viewIncident';

import CreateUser from './components/createUser';
import ReadUser from './components/readUser';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<ReadIncidents />} />
          <Route path='/readincident' element={<ReadIncidents />} />
          <Route path='/createIncident' element={<CreateIncident />} />
          <Route path='/viewincident' element={<ViewIncident />} />
          <Route path='/updateincident' element={<UpdateIncident />} />

          <Route path='/createuser' element={<CreateUser />} />
          <Route path='/readuser' element={<ReadUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}