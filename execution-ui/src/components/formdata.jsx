import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

const lobData = {
  Voice: ["PI Voice", "Claim Voice", "BI Voice", "ESU"],
  Email: ["PI Email", "Claim Email", "BI Email", "PI Fax"],
  Chat: ["Claim Chat", "PI Chat", "BI Chat", "CSR Assist"],
};

function replaceBlank(lob) {
  let newLob = lob.replace(/ /g, "_");
  return newLob;
}

function changeTcState(objArray) {}

export default function Formdata({ channel }) {
  const [env, setEnv] = useState("");
  const [value, setValue] = useState("");
  const [envErr, setEnvErr] = useState("");
  const [valErr, setValErr] = useState("");
  const [showTestCase, setShowTestCase] = useState(false);
  const [data, setData] = useState([]);
  const [tc, setTc] = useState([]);

  useEffect(() => {
    setEnv("");
    setValue("");
    setShowTestCase(false);
    setEnvErr("");
    setValErr("");
    setTc([{}]);
  }, [channel]);

  const handleLobChange = (event) => {
    setValue(event.target.value);
  };
  const handleEnvChange = (event) => {
    setEnv(event.target.value);
  };

  const handleExecution = (event) => {
    console.log(`Starting execution`);
    console.log(tc);
    console.log(
      `Channel = ${channel} || Lob = ${value} || Environment = ${env} || TestCase string = ${tc}`
    );
  };

  const handleTestCaseChange = (event) => {
    //setTc(event.target.value);
    console.log("Test case", event.target.value);
    console.log("Slected status", event.target.checked);
  };

  const handleDisplayTestCase = async () => {
    if (env && value) {
      setShowTestCase(true);
      setEnvErr("");
      setValErr("");
      await fetch(
        `http://localhost:8000/team/?channel=${channel}&value=${value}&env=${env}`
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          setData(res);
          res.map((items) => {
            setTc((prevStat) => ([
              ...prevStat,
              { testCase: items, state: false },
            ]));
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (!env) setEnvErr("Please select the environment");
      if (!value) setValErr("Please select the Chat LOB");
    }
  };

  return channel ? (
    <Paper
      variant="outlined"
      sx={{
        width: "40%",
        height: "40%",
        margin: "3rem auto",
        padding: "2rem",
      }}
    >
      <Typography
        sx={{ fontSize: "18px", paddingBottom: "1.5rem", color: "#e01719" }}
      >
        {channel}
      </Typography>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Select Chat LOB
        </FormLabel>
        <h6 style={{ color: "#e01719", margin: "0 auto" }}>{valErr}</h6>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {lobData[`${channel}`].map((menuItem) => (
            <FormControlLabel
              control={<Radio size="small" />}
              label={menuItem}
              onChange={handleLobChange}
              value={replaceBlank(menuItem)}
            />
          ))}
          <Box sx={{ width: "30%", marginTop: "1.5rem" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Env</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={env}
                label="Select Env"
                onChange={handleEnvChange}
              >
                <MenuItem value={"ct"}>UAT</MenuItem>
                <MenuItem value={"mo"}>MO</MenuItem>
              </Select>
              <h6 style={{ color: "#e01719", margin: 0 }}>{envErr}</h6>
            </FormControl>
          </Box>
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        sx={{ marginTop: "2rem", backgroundColor: "#e01719" }}
        onClick={handleDisplayTestCase}
      >
        Display Test Cases
      </Button>
      {showTestCase ? (
        <>
          <FormGroup sx={{ marginTop: "2rem" }}>
            <InputLabel>Select Test Cases</InputLabel>
            <FormControlLabel control={<Checkbox />} label="Select All" />
            {data.map((val) => (
              <FormControlLabel
                key={val}
                value={val}
                control={<Checkbox />}
                label={val}
                onChange={handleTestCaseChange}
              />
            ))}
          </FormGroup>
          <Button
            variant="contained"
            sx={{ marginTop: "1.5rem", backgroundColor: "#e01719" }}
            onClick={handleExecution}
          >
            Start Execution
          </Button>
        </>
      ) : (
        <></>
      )}
    </Paper>
  ) : (
    <></>
  );
}
