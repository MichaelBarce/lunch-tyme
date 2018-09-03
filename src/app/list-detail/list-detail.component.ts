import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Restaurant } from '../model/restaurant';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {

  private disableSideNav: boolean;
  private restaurant: Restaurant;
  restaurantList: Restaurant[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log("ListDetailComponent :: ngOnInit()");
    this.disableSideNav = false;
    this.dataService.changeDisableSideNav(this.disableSideNav);
    this.getRestaurants();
    this.dataService.disableSideNavChanges$.subscribe(
      data => {
        this.disableSideNav = data;
        console.log("ListDetailComponent :: ngOnInit :: subscribe :: disableSideNavChanges$ ");
        console.log("this.disableSideNav");
        console.log(this.disableSideNav);
      }
    );     
  }

  getRestaurants() {
    console.log("ListDetailComponent :: getRestaurants()");
    this.dataService.getRestaurants().subscribe(
      data => {
        this.restaurantList = data.restaurants;
        this.restaurant = data.restaurants[0];
        this.dataService.setSelectedRestaurant(this.restaurant);
        console.log(this.restaurantList);
      });
  }

  viewDetails(restaurant){
    console.log("ListDetailComponent :: viewDetails()");
    console.log("restaurant.name: " + restaurant.name);
    this.dataService.setSelectedRestaurant(restaurant);
    this.disableSideNav = true;
    this.dataService.changeDisableSideNav(this.disableSideNav);
  }

  private initializeMap() {
    console.log('ListDetailComponent :: initializeMap');
    this.restaurant = this.dataService.getSelectedRestaurant();
    // if (this.restaurant == undefined) {
    //   this.router.navigate(['/listdetail']);
    // }
  }

}
