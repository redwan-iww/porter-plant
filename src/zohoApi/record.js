import { dataCenterMap } from "../config/config";

const ZOHO = window.ZOHO;

export async function getRecordsFromRelatedList({
  module,
  recordId,
  RelatedListAPI,
}) {
  try {
    const relatedListResp = await ZOHO.CRM.API.getRelatedRecords({
      Entity: module,
      RecordID: recordId,
      RelatedList: RelatedListAPI,
    });

    if (relatedListResp.statusText === "nocontent") {
      return { data: [], error: null };
    }

    if (!(relatedListResp.statusText === "nocontent")) {
      return { data: relatedListResp?.data, erroe: null };
    }
  } catch (getRecordsFromRelatedListError) {
    console.log({ getRecordsFromRelatedListError });
    return { data: null, error: "Something went wrong" };
  }
}

export async function getBulkRecordDetailsRestAPI({ accessToken, url }) {
  const module = "Leads";
  const url2 = `${dataCenterMap.US}/crm/v6/${module}?ids=6097251000000519417,6097251000000519416`;
  //url = "https://www.zohoapis.com/crm/v6/Leads?ids=4731441000017895165,4731441000017895072,4731441000017139216,4731441000016814042,4731441000016814018,4731441000016543060,4731441000016023225,4731441000015988066,4731441000015982001,4731441000015981001,4731441000015979036,4731441000015979001,4731441000015964002,4731441000014979008,4731441000014471064,4731441000014471026,4731441000014471010,4731441000014300111,4731441000014300071,4731441000014300031&fields=Full_Name,Testing_Field,test_new_field,Email,Email_3,field_mapping_email,field_mapping_email_1,Company_Email,Client_Email"
  try {
    var req_data = {
      params: {},
      url,
      param_type: 1,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    const resp = await ZOHO.CRM.HTTP.get(req_data);
    const resp_json = await JSON.parse(resp);
    return {
      data: resp_json.data,
      error: null,
    };
  } catch (getBulkRecordDetailsRestAPIError) {
    console.log({ getBulkRecordDetailsRestAPIError });
    return { data: null, error: "Something went wrong" };
  }
}

export const record = {
  getRecordsFromRelatedList,
  getBulkRecordDetailsRestAPI,
};
