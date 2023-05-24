import React from "react";
import BarChartCSV from "./scatter_chart2.csv"

const CreateScatter = () => {
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  const [imageAppended, setImageAppended] = React.useState(false);
  // ref
  const inputRef = React.useRef(null);
  
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
  
  return (
    <div className="layout">
    
    <div> <h2> Create your scatter plot! </h2> </div>
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
    

      <div id="image-container" style={{ border: "2px dashed grey" }}>
      </div>
      {imageAppended && (
                <button className="button">Save</button>
              )}
      </div>
      
      
    </div>
  );
};

export default CreateScatter; 