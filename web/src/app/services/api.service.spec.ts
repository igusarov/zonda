import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { SubdivisionApiResponse, SubdivisionStatusCode } from "../models/subdivision.model";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSubdivisions', () => {
    it('should return subdivisions', () => {
      const mockData: SubdivisionApiResponse = {
        subdivisions: [
          {
            "id": 26951,
            "code": "001B3",
            "name": "Alexander Park",
            "longitude": -115.07067,
            "latitude": 36.233263,
            "fieldSurveyTerritoryId": 3782,
            "marketId": 16,
            "subdivisionStatusId": 2,
            "surveyMethodId": 2,
            "activeSections": 0,
            "futureSections": 1,
            "builtOutSections": 2,
            "totalLots": 237,
            "fieldSurveyTerritoryName": "EldorBI",
            "marketName": "Las Vegas",
            "marketAbbreviation": "LV",
            "subdivisionStatusCode": SubdivisionStatusCode.Active,
            "surveyMethodCode": "DRIVE",
            "county": "Clark",
            "community": null,
            "zoom17Date": "2023-08-11T18:20:25.557Z",
            "zoom18Date": "2023-08-11T18:20:25.557Z",
            "subdivisionGeometryId": null,
            "subdivisionGeometryBoundingBoxId": null,
            "subdivisionGeometryBoundaryId": null,
            "subdivisionGeometryIntelligenceBoundaryId": 24714,
            "subdivisionGeometryIntelligenceBoundaryStatusId": 4,
            "subdivisionGeometryIntelligenceBoundaryStatusCode": "Finalized",
            "subdivisionGeometryIntelligenceBoundaryStatusChangeDate": "2022-07-14T04:41:38.403Z",
            "nearMapImageDate": "2023-06-17T18:02:42.000Z",
            "imageBoxId": 59809,
            "mostRecentIPointBatchDate": "2023-07-07T00:00:00.000Z",
            "iPoints": null,
            "validatediPoints": null,
            "subdivisionSpecificStatus": "Future"
          }
        ]
      }
      let response: any;
      service.getSubdivisions().subscribe((data) => response = data);

      const req = httpTestingController.expectOne('http://localhost:3000/v1/subdivisions');
      req.flush(mockData);

      expect(req.request.method).toEqual('GET');
      expect(response).toEqual(mockData);
    })
  })
});
