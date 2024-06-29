import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { SubdivisionApiResponse } from "../models/subdivision.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getSubdivisions(){
    return this.http.get<SubdivisionApiResponse>(`${environment.apiUrl}/subdivisions`);
  }
}
