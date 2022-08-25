import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";

const pages = [
  { id: 1, page: "Voice" },
  { id: 2, page: "Chat" },
  { id: 3, page: "Email" },
];

export default function Navbar({ setChannel }) {
  return (
    <AppBar
      sx={{
        position: "relative",
        backgroundColor: "white",
        boxShadow: "0 5px 15px 0 rgb(0 0 0 / 6%)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ height: "45px", width: "150px" }}
              src="https://www.travelers.com/assets/images/travelers-logo.svg"
              alt="main_logo"
            />
            <Typography
              sx={{
                fontSize: "20px",
                color: "#e01719",
                margin: "0.5rem 0 0 0.75rem",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              DE Automation
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            {pages.map((entry) => (
              <MenuItem
                key={entry.id}
                onClick={async () => {
                  setChannel(entry.page);
                }}
              >
                <Typography
                  textAlign="center"
                  noWrap
                  sx={{
                    color: "#e01719",
                    fontSize: "18px",
                  }}
                >
                  {entry.page}
                </Typography>
              </MenuItem>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
