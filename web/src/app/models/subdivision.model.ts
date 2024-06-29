export enum SubdivisionStatusCode {
  Future = "Future",
  BuiltOut = "Builtout",
  Active = "Active",
}

export type Subdivision = {
  "id": number,
  "code": string,
  "name": number,
  "longitude": number,
  "latitude": number,
  "fieldSurveyTerritoryId": number,
  "marketId": number,
  "subdivisionStatusId": number,
  "surveyMethodId": number,
  "activeSections": number,
  "futureSections": number,
  "builtOutSections": number,
  "totalLots": number,
  "fieldSurveyTerritoryName": string,
  "marketName": string,
  "marketAbbreviation": string,
  "subdivisionStatusCode": SubdivisionStatusCode,
  "surveyMethodCode": string,
  "county": string,
  "community": string,
  "zoom17Date": string,
  "zoom18Date": string,
  "subdivisionGeometryId": number,
  "subdivisionGeometryBoundingBoxId": number,
  "subdivisionGeometryBoundaryId": number,
  "subdivisionGeometryIntelligenceBoundaryId": number,
  "subdivisionGeometryIntelligenceBoundaryStatusId": number,
  "subdivisionGeometryIntelligenceBoundaryStatusCode": string,
  "subdivisionGeometryIntelligenceBoundaryStatusChangeDate": string,
  "nearMapImageDate": string,
  "imageBoxId": number,
  "mostRecentIPointBatchDate": string,
  "iPoints": unknown,
  "validatediPoints": unknown,
  "subdivisionSpecificStatus": string
}

export type SubdivisionApiResponse = {
  subdivisions: Subdivision[],
}