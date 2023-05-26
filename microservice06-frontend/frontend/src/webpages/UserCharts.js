import React, { useState, useEffect, useContext } from 'react';
import ScrollableTable from '../components/ScrollableTable';
import axios from 'axios';
import UserContext from '../UserContext';

function UserCharts() {

  const [user_charts, setUserCharts] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {

    const getUserCharts = () => {

      console.log("fetch");
      const url = `http://localhost:9107/chart_from_database/get_charts/${user.googleaccount.emails[0].value}`;
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((resObject) => {
          console.log(resObject)

          const data = [];

          for (let i = 0; i < resObject.length; i++) {
            const obj = resObject[i];
            const dataobj = {
              column1: obj.type,
              column2: obj.chart_title,
              column3: obj.date.split('T')[0]
            };

            data.push(dataobj);

          }
          console.log(data);
          setUserCharts(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUserCharts();
  }, []);

  const handleRowClick = () => {
    window.location.href = "http://localhost:3030/user/charts"
  };

  return (
    <div className='layout'>
      {user ? (<div>
        <h1>Your Saved Charts</h1>
        <ScrollableTable data={user_charts} onRowClick={handleRowClick} />
      </div>) : (

        <div className="layout">
          <h1>Looks like you're not authorized to view this page. </h1><br></br>
          Please Sign In to use our service...
        </div>


      )}


    </div>
  );
}


export default UserCharts;