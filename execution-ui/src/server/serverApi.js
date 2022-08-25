const express = require("express");
const app = express();
const fs = require("fs");

function replaceText(val) {
  let newVal = val.replace(/_/g, " ");
  return newVal;
}

app.get("/team/", (req, res) => {
  const { channel, value, env } = req.query;
  var newValue = replaceText(value);
  console.log(
    `Channel = ${channel} || Lob = ${newValue} || Environment = ${env}`
  );
  const data = fs.readFileSync(`${channel}.json`);
  //   const testCases = JSON.parse(data[`${newValue}`]);
  const testCases = JSON.parse(data);
  console.log(testCases[`${newValue}`]);
  res.send(Object.keys(testCases[`${newValue}`]));
});

app.post("/startExeccution/", (req, res) => {});

app.get("/test/", (req, res) => {
  const { sample } = req.query;
  res.send(sample);
});

app.listen(8000, () => {
  console.log("Listening at 8000...");
});
