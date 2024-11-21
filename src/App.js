import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useZohoInit } from "./hook/useZohoInit";
import { zohoApi } from "./zohoApi";

const ZOHO = window.ZOHO;
const parentContainerStyle = {
  borderTop: "1px solid #BABABA",
  minHeight: "calc(100vh - 1px)",
  p: "1em",
  display: "flex",
  flexDirection: "column",
};

function App() {
  const { module, recordId } = useZohoInit({ height: "50%", width: "50%" });
  const [initPageContent, setInitPageContent] = React.useState(
    <CircularProgress />
  );
  const [accountTypes, setAccountTypes] = React.useState();
  console.log({ accountTypes });
  const [contacts, setContacts] = React.useState();
  // let selectedData = {};
  let selectedData = React.useRef({});
  // let selectedData = React.useRef({ contacts: null, accounts: null });

  React.useEffect(() => {
    const fetchRecords = async () => {
      const { data: contactRecords } =
        await zohoApi.record.getBulkRecordDetailsRestAPI({
          module: "Contacts",
        });
      setContacts(contactRecords);
      const { data: accountRecords } =
        await zohoApi.record.getBulkRecordDetailsRestAPI({
          module: "Accounts",
        });
      const temp = {};
      accountRecords?.forEach((el) => {
        if (el?.Account_Type) {
          temp[el.Account_Type] = temp[el?.Account_Type]
            ? [...temp[el?.Account_Type], el]
            : [el];
        } else {
          temp.null = temp.null ? [...temp.null, el] : [el];
        }
      });
      setAccountTypes(temp);
      setInitPageContent(null);
    };
    if (module) {
      fetchRecords();
    }
  }, [module]);

  return (
    <Box sx={parentContainerStyle}>
      {initPageContent ? (
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
      ) : null}
      {initPageContent ? null : (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
            }}
          >
            <Autocomplete
              multiple
              disabled={!contacts}
              options={contacts}
              size="small"
              onChange={(event, value) => {
                selectedData.current.contacts = value;
              }}
              getOptionLabel={(option) => option?.Full_Name}
              renderInput={(params) => (
                <TextField {...params} label="Contacts" />
              )}
            />
            <Autocomplete
              multiple
              disabled={!accountTypes?.Customer}
              options={accountTypes?.Customer}
              size="small"
              onChange={(event, value) => {
                if (!selectedData.current.account) {
                  selectedData.current.account = {};
                }
                selectedData.current.account.Customer = value;
              }}
              getOptionLabel={(option) => option?.Account_Name}
              renderInput={(params) => (
                <TextField {...params} label="Companies" />
              )}
            />
            <Autocomplete
              multiple
              disabled={!accountTypes?.Distributor}
              options={accountTypes?.Distributor}
              size="small"
              onChange={(event, value) => {
                if (!selectedData.current.account) {
                  selectedData.current.account = {};
                }
                selectedData.current.account.Distributor = value;
              }}
              getOptionLabel={(option) => option?.Account_Name}
              renderInput={(params) => (
                <TextField {...params} label="Contractors" />
              )}
            />
            <Autocomplete
              multiple
              disabled={!accountTypes?.Supplier}
              options={accountTypes?.Supplier}
              size="small"
              onChange={(event, value) => {
                if (!selectedData.current.account) {
                  selectedData.current.account = {};
                }
                selectedData.current.account.Supplier = value;
              }}
              getOptionLabel={(option) => option?.Account_Name}
              renderInput={(params) => (
                <TextField {...params} label="Sub-Contractors" />
              )}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1em" }}>
            <Button
              variant="outlined"
              onClick={async (params) => {
                ZOHO.CRM.UI.Popup.close();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={async (params) => {
                zohoApi.record.updateRecord({
                  module,
                  recordData: {
                    id: recordId?.[0],
                    associate_data: selectedData.current,
                  },
                });
                ZOHO.CRM.UI.Popup.closeReload();
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default App;
