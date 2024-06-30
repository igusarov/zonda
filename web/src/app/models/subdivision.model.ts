export enum SubdivisionStatusCode {
  Future = "Future",
  BuiltOut = "Builtout",
  Active = "Active",
}

export type Subdivision = {
  "id": number,
  "code": string,
  "name": string,
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
  "community": string | null,
  "zoom17Date": string,
  "zoom18Date": string,
  "subdivisionGeometryId": number | null,
  "subdivisionGeometryBoundingBoxId": number | null,
  "subdivisionGeometryBoundaryId": number | null,
  "subdivisionGeometryIntelligenceBoundaryId": number,
  "subdivisionGeometryIntelligenceBoundaryStatusId": number,
  "subdivisionGeometryIntelligenceBoundaryStatusCode": string,
  "subdivisionGeometryIntelligenceBoundaryStatusChangeDate": string,
  "nearMapImageDate": string,
  "imageBoxId": number,
  "mostRecentIPointBatchDate": string | null,
  "iPoints": unknown,
  "validatediPoints": unknown,
  "subdivisionSpecificStatus": string
}

export type SubdivisionApiResponse = {
  subdivisions: Subdivision[],
}