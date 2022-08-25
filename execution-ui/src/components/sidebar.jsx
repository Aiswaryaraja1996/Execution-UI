import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Typography } from "@mui/material";

export default function Sidebar({ setEmail, email }) {
  const [localMail, setLocalMail] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const submitClick = () => {
    if (localMail) {
      setEmail(localMail);
      setSuccessMsg(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Please enter a valid email id.");
    }
  };

  return (
    <Box
      sx={{
        width: "20%",
        height: "100vh",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        paddingTop: "1.5rem",
      }}
    >
      {successMsg ? (
        <Typography sx={{ fontSize: "12px" }}>
          You will receive execution report shortly in{" "}
          <span style={{ fontWeight: "bold" }}>{email}</span>.
        </Typography>
      ) : (
        <Box>
          <TextField
            sx={{ fontSize: "14px" }}
            id="standard-basic"
            label="Email"
            variant="standard"
            helperText="Enter email address to receive the execution summary report."
            onChange={(e) => setLocalMail(e.target.value)}
          />
          <Typography sx={{ fontSize: "12px", color: "#e01719" }}>
            {errorMsg}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ marginTop: "1.5rem" }}
            onClick={submitClick}
          >
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
}
