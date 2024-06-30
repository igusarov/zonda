import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionDataDisplayComponent } from './subdivision-data-display.component';
import { Subdivision, SubdivisionApiResponse, SubdivisionStatusCode } from "../models/subdivision.model";
import { ApiService } from "../services/api.service";
import { Observable, of } from "rxjs";

const mockData: Subdivision[] = [
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
  },
  {
    "id": 26952,
    "code": "001D7",
    "name": "Searchlight and Airpark",
    "longitude": -114.91801,
    "latitude": 35.460599,
    "fieldSurveyTerritoryId": 1693,
    "marketId": 16,
    "subdivisionStatusId": 2,
    "surveyMethodId": 2,
    "activeSections": 0,
    "futureSections": 1,
    "builtOutSections": 0,
    "totalLots": 32,
    "fieldSurveyTerritoryName": "Search/Air",
    "marketName": "Las Vegas",
    "marketAbbreviation": "LV",
    "subdivisionStatusCode": SubdivisionStatusCode.Future,
    "surveyMethodCode": "DRIVE",
    "county": "Clark",
    "community": null,
    "zoom17Date": "2023-07-02T18:02:02.873Z",
    "zoom18Date": "2023-05-19T21:27:14.000Z",
    "subdivisionGeometryId": null,
    "subdivisionGeometryBoundingBoxId": null,
    "subdivisionGeometryBoundaryId": null,
    "subdivisionGeometryIntelligenceBoundaryId": 58509,
    "subdivisionGeometryIntelligenceBoundaryStatusId": 2,
    "subdivisionGeometryIntelligenceBoundaryStatusCode": "Default",
    "subdivisionGeometryIntelligenceBoundaryStatusChangeDate": "2020-08-25T18:16:50.463Z",
    "nearMapImageDate": "2022-07-06T17:13:41.000Z",
    "imageBoxId": 59810,
    "mostRecentIPointBatchDate": null,
    "iPoints": null,
    "validatediPoints": null,
    "subdivisionSpecificStatus": "Future"
  },
  {
    "id": 26955,
    "code": "002B2",
    "name": "Arlington Park",
    "longitude": -115.07822,
    "latitude": 36.188247,
    "fieldSurveyTerritoryId": 1683,
    "marketId": 16,
    "subdivisionStatusId": 2,
    "surveyMethodId": 2,
    "activeSections": 0,
    "futureSections": 1,
    "builtOutSections": 0,
    "totalLots": 223,
    "fieldSurveyTerritoryName": "EldorBA",
    "marketName": "Las Vegas",
    "marketAbbreviation": "LV",
    "subdivisionStatusCode": SubdivisionStatusCode.BuiltOut,
    "surveyMethodCode": "DRIVE",
    "county": "Clark",
    "community": null,
    "zoom17Date": "2023-08-11T18:20:25.557Z",
    "zoom18Date": "2023-08-11T18:20:25.557Z",
    "subdivisionGeometryId": null,
    "subdivisionGeometryBoundingBoxId": null,
    "subdivisionGeometryBoundaryId": null,
    "subdivisionGeometryIntelligenceBoundaryId": 58510,
    "subdivisionGeometryIntelligenceBoundaryStatusId": 4,
    "subdivisionGeometryIntelligenceBoundaryStatusCode": "Finalized",
    "subdivisionGeometryIntelligenceBoundaryStatusChangeDate": "2023-06-15T20:34:35.997Z",
    "nearMapImageDate": "2023-06-17T18:02:42.000Z",
    "imageBoxId": 59813,
    "mostRecentIPointBatchDate": null,
    "iPoints": null,
    "validatediPoints": null,
    "subdivisionSpecificStatus": "Future"
  },
];

class MockApiService {
  getSubdivisions(): Observable<SubdivisionApiResponse> {
    return of({ subdivisions: mockData});
  }
}

describe('SubdivisionDataDisplayComponent', () => {
  let component: SubdivisionDataDisplayComponent;
  let fixture: ComponentFixture<SubdivisionDataDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubdivisionDataDisplayComponent],
      providers: [
        {provide: ApiService, useClass: MockApiService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SubdivisionDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter by status code', () => {
    const res1 = component.dataSource.data;

    component.updateStatusFilter(SubdivisionStatusCode.Active, true);
    component.updateStatusFilter(SubdivisionStatusCode.Future, false);
    component.updateStatusFilter(SubdivisionStatusCode.BuiltOut, false);
    const res2 = component.dataSource.data;

    component.updateStatusFilter(SubdivisionStatusCode.Active, false);
    component.updateStatusFilter(SubdivisionStatusCode.Future, true);
    component.updateStatusFilter(SubdivisionStatusCode.BuiltOut, false);
    const res3 = component.dataSource.data;

    component.updateStatusFilter(SubdivisionStatusCode.Active, false);
    component.updateStatusFilter(SubdivisionStatusCode.Future, false);
    component.updateStatusFilter(SubdivisionStatusCode.BuiltOut, true);
    const res4 = component.dataSource.data;

    component.updateStatusFilter(SubdivisionStatusCode.Active, true);
    component.updateStatusFilter(SubdivisionStatusCode.Future, true);
    component.updateStatusFilter(SubdivisionStatusCode.BuiltOut, false);
    const res5 = component.dataSource.data;

    component.updateStatusFilter(SubdivisionStatusCode.Active, false);
    component.updateStatusFilter(SubdivisionStatusCode.Future, true);
    component.updateStatusFilter(SubdivisionStatusCode.BuiltOut, true);
    const res6 = component.dataSource.data;

    component.updateStatusFilter(SubdivisionStatusCode.Active, true);
    component.updateStatusFilter(SubdivisionStatusCode.Future, false);
    component.updateStatusFilter(SubdivisionStatusCode.BuiltOut, true);
    const res7 = component.dataSource.data;

    component.updateStatusFilter(SubdivisionStatusCode.Active, true);
    component.updateStatusFilter(SubdivisionStatusCode.Future, true);
    component.updateStatusFilter(SubdivisionStatusCode.BuiltOut, true);
    const res8 = component.dataSource.data;

    expect(res1).toEqual(mockData);
    expect(res2).toEqual([mockData[0]]);
    expect(res3).toEqual([mockData[1]]);
    expect(res4).toEqual([mockData[2]]);
    expect(res5).toEqual([mockData[0], mockData[1]]);
    expect(res6).toEqual([mockData[1], mockData[2]]);
    expect(res7).toEqual([mockData[0], mockData[2]]);
    expect(res8).toEqual(mockData);
  })
});
