import React, {useContext} from "react";
import UserContext from "../../UserContext";
import BarChartCSV from "./stackplot.csv"

let svg;
const CreateStack = () => {
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  const [imageAppended, setImageAppended] = React.useState(false);
  const [title, setTitle] = React.useState("");
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
      const response = await fetch("http://localhost:9117/my_charts5/chart5_parser", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();
        const { status, message } = jsonResponse;
  
        if (status === "success") {
          // File uploaded successfully
          console.log("File uploaded successfully");
  
          // Extract SVG string from the message attribute
          const svgBuffer = JSON.parse(message).svg.data;
          const uint8Array = new Uint8Array(svgBuffer);
          const decoder = new TextDecoder("utf-8");
          const svgString = decoder.decode(uint8Array);
          console.log(svgString);
          // Render the SVG as an image
          const image = new Image();
          image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
  
          // Append the image to the DOM
          const container = document.getElementById("image-container");
          container.appendChild(image);
          setImageAppended(true);
          
        } else {
          // Handle error response
          console.error("File upload failed:", message);
          // Handle error scenario, e.g., show an error message
        }
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
        type: "Simple Plot",
        email:  user.googleaccount.emails[0].value,
        svg: svg
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
      } else {
        // Handle error response
        console.error("Failed to save the chart");
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
    
    <div> <h2> Create your stack chart! </h2> </div>
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
        download="Example-Stack-Chart.csv"
        target="_blank"
        rel="noreferrer"
      >
        <button className="button">Download example</button>
      </a>
      </div>
    </div>
    <div>
        <div id="image-container" style={{ border: "2px dashed grey" }}></div>
        {imageAppended && (
          <button className="button" onClick={handleSaveChart}>
            Save Chart
          </button>
        )}
    </div>      
    </div>
  );
};

export default CreateStack; 