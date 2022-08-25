const fs = require("fs");
const lobData = {
  Voice: ["PI_Voice", "Claim_Voice", "BI_Voice", "ESU"],
  Email: ["PI Email", "Claim Email", "BI Email", "PI Fax"],
  Chat: ["Claim Chat", "PI Chat", "BI Chat", "CSR Assist"],
};

const arrObj = [
  { testCase: "Regression", state: false },
  { testCase: "newRegrssion", state: false },
  { testCase: "againRegression", state: false },
];

function replaceBlank(lob) {
  let newLob = lob.replace(/_/g, " ");
  return newLob;
}
function test(channel) {
  lobData[`${channel}`].map((values) => {
    console.log(replaceBlank(values));
  });
}

function changeTcState(objArray) {}

test("Voice");
