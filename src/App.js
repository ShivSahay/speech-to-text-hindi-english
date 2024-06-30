import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useEffect, useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Grid, Typography } from "@mui/material";

const App = () => {
  const [textToCopy, setTextToCopy] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [text, setText] = useState();

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
    SpeechRecognition.startListening({ continuous: true, language: event.target.value })
  };

  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: selectedLanguage });
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();



  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <Grid className="container">
        <h2>Speech to Text Converter</h2>
        <br />

        <Grid
          item
          container
          sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <Typography>
            Selet you language to to convert speech to text
          </Typography>
          <Grid
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedLanguage}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="en-US"
                  control={<Radio />}
                  label="English"
                />
                <FormControlLabel
                  value="hi-IN"
                  control={<Radio />}
                  label="Hindi"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          className="main-content"
          onClick={() => setTextToCopy(transcript)}
        >
          {text}
        </Grid>

        <Grid className="btn-style">
          <button onClick={setCopied}>
            {isCopied ? "Copied!" : "Copy to clipboard"}
          </button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>
            Stop Listening
          </button>
          <button
            onClick={() => {
              resetTranscript();
              setTextToCopy("");
              setText("");
            }}
          >
            Refresh
          </button>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
