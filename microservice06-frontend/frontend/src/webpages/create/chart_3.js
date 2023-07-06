import React, {useContext} from "react";
import BarChartCSV from "./scatter_chart2.csv"
import UserContext from "../../UserContext";

let svg;
const CreateScatter = () => {
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  const [imageAppended, setImageAppended] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [svgString, setSvgString] = React.useState("");

  // ref
  const inputRef = React.useRef(null);
  const { user } = useContext(UserContext);

  if (user == null) {
    return (
      <div className="layout">
        <h1>Looks like you're not authorized to view this page. </h1><br></br>
         Please Sign In to use our service...
      </div>
    )
  }
  // handle drag events
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // triggers when file is dropped
  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  // triggers when file is selected with click
  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = async function(files) {
    const formData = new FormData();
    formData.append("my_csv", files[0]);
  
    try {
      const response = await fetch("http://localhost:9113/my_charts3/chart3_parser", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();
        const { status, message } = jsonResponse;

        fetch(`http://localhost:3000/redeem`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.ok) {
              // File uploaded successfully
              console.log("File uploaded successfully");

              // Extract SVG string from the message attribute
              const svgBuffer = JSON.parse(message).svg.data;
              const uint8Array = new Uint8Array(svgBuffer);
              const decoder = new TextDecoder("utf-8");
              const svg = decoder.decode(uint8Array);
              //console.log(svg);
              setSvgString(svg);
              // Render the SVG as an image
              const image = new Image();
              image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

              // Append the image to the DOM
              const container = document.getElementById("image-container");
              container.innerHTML = ""; // Clear existing chart if the user has already produced one

              container.appendChild(image);
              setImageAppended(true);
            }
            else {
              const text = new Text("You don't have enough credits...")
              const container = document.getElementById("image-container");
              container.appendChild(text);
            }
          }
          )
      } else {
        // Handle error response
        console.log(response);
        window.alert("Cannot prepare your chart!\nYour file contains errors...");

        console.error("File upload failed");
        // Handle error scenario, e.g., show an error message
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
      // Handle error scenario, e.g., show an error message
    }
  };
  
// triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  // handles title input change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // handles saving the chart
  const handleSaveChart = async () => {
    try {
      //console.log("JOINED");
      const data = {
        title: title,
        type: "Scatter Plot",
        email:  user.googleaccount.emails[0].value,
        svg: svgString
      };
      const response = await fetch(
        "http://localhost:9106/chart_to_database/add_chart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // Chart saved successfully
        console.log("Chart saved successfully");
        window.alert("Chart saved successfully!");
      } else {
        // Handle error response
        console.error("Failed to save the chart");
        window.alert("Could not save the chart...");
        // Handle error scenario, e.g., show an error message
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
      // Handle error scenario, e.g., show an error message
    }
  };
  
  return (
    <div className="layout">
    <div> <h2> Create your scatter plot! </h2> </div>
    <div className="title-box">
      <input
        type="text"
        className="title-input"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter title"
      />
    </div>
    <div>
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
        <div>
          <p>Drop your .csv file here or</p>
          <button className="upload-button" onClick={onButtonClick}>Browse file explorer</button>
        </div> 
      </label>
      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </form>
    <div>
    <h3>Model your CSV on this example! </h3>
    <a
        href={BarChartCSV}
        download="Example-Scatter-Plot.csv"
        target="_blank"
        rel="noreferrer"
      >
        <button className="button">Download example</button>
      </a>
      </div>
    </div>
    <div>
        <div id="image-container"></div>
        {imageAppended && (
          <button className="button" onClick={handleSaveChart}>
            Save Chart
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateScatter; 