import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Restaurants } from '../model/restaurants';
import { Restaurant } from '../model/restaurant';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

restaurantList: Restaurant[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log("ListDetailComponent :: ngOnInit()");
    this.getRestaurants();

  }

  getRestaurants() {
    console.log("ListDetailComponent :: getRestaurants()");
    this.dataService.getRestaurants().subscribe(
      data => {
        this.restaurantList = data.restaurants;
        console.log(this.restaurantList);
      });
  }

}
