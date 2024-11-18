import { dataCenterMap, conn_name } from "../config/config";

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

export async function getBulkRecordDetailsRestAPI_AT({ accessToken, url }) {
  //url = "https://www.zohoapis.com/crm/v6/Leads?ids=4731441000017895165,4731441000017895072,4731441000017139216,4731441000016814042,4731441000016814018,4731441000016543060,4731441000016023225,4731441000015988066,4731441000015982001,4731441000015981001,4731441000015979036,4731441000015979001,4731441000015964002,4731441000014979008,4731441000014471064,4731441000014471026,4731441000014471010,4731441000014300111,4731441000014300071,4731441000014300031&fields=Full_Name,Testing_Field,test_new_field,Email,Email_3,field_mapping_email,field_mapping_email_1,Company_Email,Client_Email"
  try {
    var req_data = {
      params: {},
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      url,
      param_type: 1,
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

export async function getBulkRecordDetailsRestAPI_CONN({ module, idArr }) {
  let url = `${dataCenterMap.US}/crm/v6/${module}?fields=Full_Name,Phone,Mobile,Email`;
  if (idArr?.length > 0) {
    const tempIds = idArr?.join(",") || "";
    url = `${url}&ids=${tempIds}`;
  }
  try {
    var req_data = {
      params: {},
      headers: {},
      url,
      param_type: 1,
    };
    const resp = await ZOHO.CRM.CONNECTION.invoke(conn_name, req_data);
    const resp_data = await resp?.details?.statusMessage?.data;
    return {
      data: resp_data,
      error: null,
    };
  } catch (getBulkRecordDetailsRestAPIError) {
    console.log({ getBulkRecordDetailsRestAPIError });
    return { data: null, error: "Something went wrong" };
  }
}

export async function getBulkRecordDetailsRestAPI({ module }) {
  try {
    const resp = await ZOHO.CRM.API.getAllRecords({ Entity: module });
    return {
      data: resp?.data,
      error: null,
    };
  } catch (getBulkRecordDetailsRestAPIError) {
    console.log({ getBulkRecordDetailsRestAPIError });
    return { data: null, error: "Something went wrong" };
  }
}

export async function updateRecord({ module, recordData }) {
  try {
    const resp = await ZOHO.CRM.API.updateRecord({
      Entity: module,
      APIData: recordData,
    });
    console.log({ resp });
  } catch (updateRecordError) {
    console.log({ updateRecordError });
  }
}

export const record = {
  getRecordsFromRelatedList,
  getBulkRecordDetailsRestAPI,
  updateRecord,
};
