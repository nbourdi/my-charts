import React, { useState, useEffect, useContext } from 'react';
import ScrollableTable from '../components/ScrollableTable';
import axios from 'axios';
import UserContext from '../UserContext';

function UserCharts() {
  const [results, setResults] = useState();

  const { user } = useContext(UserContext);

  // if (user == null) {
  //   return (
  //     <div className="layout">
  //       <h1>Looks like you're not authorized to view this page. </h1><br></br>
  //        Please Sign In to use our service...
  //     </div>
  //   )
  // }
  const data = [
    { column1: 'Row 1', column2: 'Value 1', column3: 'Value 2', column4: 'Value 3' },
    { column1: 'Row 2', column2: 'Value 4', column3: 'Value 5', column4: 'Value 6' },
    { column1: 'Row 3', column2: 'Value 7', column3: 'Value 8', column4: 'Value 9' },
    // Add more rows as needed
  ];
  useEffect(() => {

    const getResults = () => {
      if (results) {
        return;
      }
      console.log("fetch");
      fetch("http://localhost:3000/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((resObject) => {
          setResults(resObject.results);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getResults();
  }, [results]);

  const handleRowClick = () => {
    window.location.href = "http://localhost:3030/user/charts"
  };
  return (
    <div className='layout'>
      {user ? (<div>
        <h1>Your Saved Charts</h1>
        <ScrollableTable data={data} onRowClick={handleRowClick} />
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