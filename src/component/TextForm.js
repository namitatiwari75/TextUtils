import React, { useState } from "react";

export default function TextForm(props) {

  const handleClearClick = () => {
    let newText = '';
    setText(newText);
    props.showAlert('Text Cleared',"success");
  }

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert('Converted to UpperCase',"success");
  };

  const handleLowerClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert('Converted to LowerCase',"success");
  };
  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  // const speak = () => {
  //     let msg = new SpeechSynthesisUtterance();
  //     msg.text = text;
  //     window.speechSynthesis.speak(msg);
  // }

  const speak = () => {
    let msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
    const toogle = document.getElementById("toggle");
    if (toogle.textContent === "Speak") {
      toogle.innerHTML = "Stop";
    } else {
      toogle.innerHTML = "Speak";
      if (toogle.innerHTML === "Speak") {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleinverseclick = () => {
    console.log("inverse click is triggered");
    let newtext = "";
    for (let i = text.length - 1; i >= 0; i--) {
    newtext += text[i];
    }
    setText(newtext);
    props.showAlert('Text Inversed',"success");
    };

      // copy text
    const handleCopy = () => {
      var text = document.getElementById("myBox");
      text.select();
      navigator.clipboard.writeText(text.value);
      props.showAlert('Copied to Clipboard',"success");
    }

    // Handle extra spaces
    const handleExtraSpaces = () => {
      let newText = text.split(/[ ]+/);
      setText(newText.join(" "));
      props.showAlert('Removed Extra Spaces',"success");
    }

  const [text, setText] = useState("");

  return (
    <>
      <div className="container" style={{color : props.mode==='dark'?'white':'#042743'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea className="form-control" id="myBox" rows="8" value={text}
          onChange={handleOnChange} style={{backgroundColor : props.mode==='dark'?'gray':'white', color : props.mode==='dark'?'white':'#042743'}}>
          </textarea>
        </div>
        <button type="button" className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to UpperCase</button>
        <button type="button" className="btn btn-primary mx-1" onClick={handleLowerClick}>Convert to LowerCase</button>
        {/* <button type="submit" onClick={speak} className="btn btn-warning mx-2 my-2"> Speak  </button> */}
        <button type="submit" onClick={speak} className="btn btn-warning mx-2 my-2" id="toggle">Speak</button>
        <button type="button" onClick={handleinverseclick} className="btn btn-warning mx-2 my-2">Inverse</button>
        <button type="button" onClick={handleCopy} className="btn btn-warning mx-2 my-2">Copy Text</button>
        <button type="button" onClick={handleExtraSpaces} className="btn btn-warning mx-2 my-2">Remove Extra Spaces</button>
        <button type="button" onClick={handleClearClick} className="btn btn-warning mx-2 my-2">Clear Text</button>

      </div>
      <div className="container my-3" style={{color : props.mode==='dark'?'white':'#042743'}}>
        <h1>Your Text Summary</h1>
        <p>
          No of Words : - {text.split(" ").length} <br />
          <br />
          No Of Characters :- {text.length}
        </p>
        <p>Read In {0.008 * text.split(" ").length} Minutes</p>
        <h2>Preview</h2>
        <p> {text.length>0 ? text : "Enter Somthing in the Textbox Above to Preview it here."} </p>
      </div>
    </>
  );
}
