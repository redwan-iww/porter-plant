import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { useZohoInit } from "./hook/useZohoInit";
import { zohoApi } from "./zohoApi";

const parentContainerStyle = {
  borderTop: "1px solid #BABABA",
  minHeight: "calc(100vh - 1px)",
  p: "1em",
};

function App() {
  const { module, recordId } = useZohoInit({ height: "50%", width: "50%" });
  console.log({ module, recordId });
  const [initPageContent, setInitPageContent] = React.useState(
    <CircularProgress />
  );
  React.useEffect(() => {
    const fetchRecords = async () => {
      const { data: contactRecords } =
        await zohoApi.record.getBulkRecordDetailsRestAPI({
          module: "Contacts",
        });
      const { data: accountRecords } =
        await zohoApi.record.getBulkRecordDetailsRestAPI({
          module: "Accounts",
        });
      console.log({ contactRecords, accountRecords });
    };
    if (module) {
      fetchRecords();
    }
  }, [module]);
  return (
    <Box sx={parentContainerStyle}>
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {initPageContent}
      </span>
    </Box>
  );
}

export default App;
