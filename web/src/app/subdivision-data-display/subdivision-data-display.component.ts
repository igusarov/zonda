import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";

@Component({
  selector: 'app-subdivision-data-display',
  templateUrl: './subdivision-data-display.component.html',
  styleUrls: ['./subdivision-data-display.component.css']
})
export class SubdivisionDataDisplayComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getSubdivisions().subscribe(console.log);
  }

}
