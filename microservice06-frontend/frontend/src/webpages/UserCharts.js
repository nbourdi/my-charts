import React, { useState, useEffect, useContext } from 'react';
import ScrollableTable from '../components/ScrollableTable';
import UserContext from '../UserContext';

function callEndpoint(url, svg, title, type) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      svg: svg
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      const filename = title;
      const extension = type;

      // Create a URL for the blob object
      return response.blob().then(blob => {
        console.log(blob);
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename + "_" + extension;

        // Programmatically click the anchor to trigger the download
        anchor.click();

        // Clean up the temporary anchor and URL
        URL.revokeObjectURL(url);
      });
    })
    .catch(error => {
      // Handle errors
      console.error(error);
    });
}

function UserCharts() {

  const [user_charts, setUserCharts] = useState([]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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
            const svg = obj.svg_string;
            const url_pdf = `http://localhost:9130/download/download_chart_pdf`
            const url_html = `http://localhost:9130/download/download_chart_html`
            const url_png = `http://localhost:9130/download/download_chart_png`
            const url_svg = `http://localhost:9130/download/download_chart_svg`

            const dataobj = {
              column1: obj.type,
              column2: obj.chart_title,
              column3: obj.date.split('T')[0],
              column4: (
                <div>
                  <a href="#" onClick={(event) => { event.preventDefault(); callEndpoint(url_pdf, svg, obj.chart_title, "pdf"); }} style={{ marginRight: '10px' }}>pdf</a>
                  <a href="#" onClick={(event) => { event.preventDefault(); callEndpoint(url_html, svg, obj.chart_title, "html"); }} style={{ marginRight: '10px' }}>html</a>
                  <a href="#" onClick={(event) => { event.preventDefault(); callEndpoint(url_png, svg, obj.chart_title, "png"); }} style={{ marginRight: '10px' }}>png</a>
                  <a href="#" onClick={(event) => { event.preventDefault(); callEndpoint(url_svg, svg, obj.chart_title, "svg"); }}>svg</a>
                </div>
              )
            };

            data.push(dataobj);
          }

          console.log(data);
          setUserCharts(data);
          const sortedData = sortData(data, sortConfig);
          setUserCharts(sortedData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUserCharts();
  }, [sortConfig]);

  const sortData = (data, config) => {
    if (!config.key) {
      return data;
    }

    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (a[config.key] < b[config.key]) {
        return config.direction === 'asc' ? -1 : 1;
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortedData;
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleRowClick = () => { };

  return (
    <div className='layout'>
      {user ? (
        <div>
          <h1>Your Saved Charts</h1>
          <ScrollableTable data={user_charts}
            onRowClick={handleRowClick}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        </div>
      ) : (
        <div className="layout">
          <h1>Looks like you're not authorized to view this page. </h1><br></br>
          Please Sign In to use our service...
        </div>
      )}
    </div>
  );
}

export default UserCharts;
