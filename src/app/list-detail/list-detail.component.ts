import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Restaurant } from '../model/restaurant';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

restaurantList: Restaurant[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

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

  viewDetails(restaurant){
    console.log("ListDetailComponent :: viewDetails()");
    console.log("restaurant.name: " + restaurant.name);
    console.log("restaurant.location.lat: " + restaurant.location.lat);
    console.log("restaurant.location.lng: " + restaurant.location.lng);
    //this.dataService.changeSelectedRestaurant(restaurant);
    this.dataService.setSelectedRestaurant(restaurant);
    this.router.navigate(['/mapbox', restaurant]);
    

  }

}
