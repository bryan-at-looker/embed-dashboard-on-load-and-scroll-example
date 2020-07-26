import React, { useState } from 'react';
import { FirstDashboard } from './FirstDashboard';
import { ScrollDashboard } from './ScrollDashboard';

const {dashboard_id} = require('../config/demo.json')


const App = () => {
  const [first_dashboard_loaded, setFirstDashboardLoaded] = useState(false)
  return(
   <>
      <h1>Dashboard 1</h1>
      <FirstDashboard 
        setFirstDashboardLoaded={setFirstDashboardLoaded} 
      />
      {first_dashboard_loaded && <>
        <h1>Dashboard 2</h1>
        <ScrollDashboard dashboard_id={dashboard_id}/>
        <h1>Dashboard 3</h1>
        <ScrollDashboard dashboard_id={dashboard_id}/>
        <h1>Dashboard 4</h1>
        <ScrollDashboard dashboard_id={dashboard_id}/>
        <h1>Dashboard 5</h1>
        <ScrollDashboard dashboard_id={dashboard_id}/>
        <h1>Dashboard 6</h1>
        <ScrollDashboard dashboard_id={dashboard_id}/>
        <h1>Dashboard 7</h1>
        <ScrollDashboard dashboard_id={dashboard_id}/>
      </>}
   </>
  );
}
export default App