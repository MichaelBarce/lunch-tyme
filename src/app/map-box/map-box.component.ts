import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Restaurant } from '../model/restaurant';
import { Router } from '@angular/router';

@Component({
  selector: 'map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss']
})
export class MapBoxComponent implements OnInit{
  private restaurant: Restaurant;

  constructor(
    private dataService: DataService,
    private router: Router) {}

  ngOnInit() {
    console.log('MapBoxComponent :: ngOnInit');  
    this.initializeMap()
  }

  private initializeMap() {
    console.log('MapBoxComponent :: initializeMap');
    this.restaurant = this.dataService.getSelectedRestaurant();
    //debugger;
    if (this.restaurant == undefined) {
      this.router.navigate(['/listdetail']);
    }
  }
}

