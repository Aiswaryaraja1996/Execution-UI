import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Formdata from "../components/formdata"
import { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

function Home() {
  const [channel, setChannel] = useState("");
  const [email, setEmail] = useState("");
  console.log(email);
  console.log(channel);

  return (
    <>
      <Navbar setChannel={setChannel} />
      <Box sx={{ display: "flex" }}>
        <Sidebar setEmail={setEmail} email={email} />
        <Divider orientation="vertical" variant="middle" flexItem />
        <Formdata channel={channel} />
      </Box>
    </>
  );
}

export default Home;
