import * as React from "react";
import Box from "@mui/material/Box";

const parentContainerStyle = {
  borderTop: "1px solid #BABABA",
  minHeight: "calc(100vh - 1px)",
  p: "1em",
  bgcolor: "yellow",
};

function App() {
  return <Box sx={parentContainerStyle}></Box>;
}

export default App;
