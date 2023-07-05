import React, { useState, useEffect, useContext } from 'react';
import ScrollableTable from '../components/ScrollableTable';
import UserContext from '../UserContext';

function callEndpoint(url, svg, title, type, setPreviewUrl, setExtension, setTitle) {
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

      // Create a URL for the blob object
      return response.blob().then(blob => {
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url); // Set the preview URL for rendering
        setExtension(type);
        setTitle(title);
      });
    })
    .catch(error => {
      // Handle errors
      console.error(error);
    });
}

function handleDownloadClick(title, type, previewUrl) {
  const filename = title;
  const extension = type;
  console.log(filename);
  console.log(extension);
  console.log(previewUrl);

  // Create a temporary anchor element
  const anchor = document.createElement('a');
  anchor.href = previewUrl;
  anchor.download = `${filename}_${extension}`;

  // Programmatically click the anchor to trigger the download
  anchor.click();
}


function UserCharts() {

  const [user_charts, setUserCharts] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');
  const [title, setTitle] = useState('');
  const [type, setExtension] = useState('');

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
                  <button onClick={() => callEndpoint(url_pdf, svg, obj.chart_title, "pdf", setPreviewUrl, setExtension, setTitle)}>Preview PDF</button>
                  <button onClick={() => callEndpoint(url_html, svg, obj.chart_title, "html", setPreviewUrl, setExtension, setTitle)}>Preview HTML</button>
                  <button onClick={() => callEndpoint(url_png, svg, obj.chart_title, "png", setPreviewUrl, setExtension, setTitle)}>Preview PNG</button>
                  <button onClick={() => callEndpoint(url_svg, svg, obj.chart_title, "svg", setPreviewUrl, setExtension, setTitle)}>Preview SVG</button>
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
          <ScrollableTable
            data={user_charts}
            onRowClick={handleRowClick}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
          {previewUrl && (
            <div>
              <h2>Preview:</h2>
              <iframe src={previewUrl} width="800" height="500" title="Preview"></iframe>
            </div>
          )}
          {previewUrl && (
            <div>
              <button onClick={() => handleDownloadClick(title, type, previewUrl)}>Download</button>
            </div>
          )}
        </div>
      ) : (
        <div className="layout">
          <h1>Looks like you're not authorized to view this page. </h1>
          <br />
          Please Sign In to use our service...
        </div>
      )}
    </div>
  );
}

export default UserCharts;