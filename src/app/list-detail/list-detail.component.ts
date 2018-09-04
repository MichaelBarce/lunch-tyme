import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../service/data.service';
import { Restaurant } from '../model/restaurant';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {

  disableSideNav: boolean;
  restaurant: Restaurant;
  restaurantList: Restaurant[];
  winWidth: number | null;
  winHeight: number | null;
  width: number| null;
  mapHeight: number| null;
  detailsTop: number| null;
  detailsLeft: number| null;
  detailsWidth: number| null;
  detailsHeight: number| null;

  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    console.log("sizeChange");
    this.winWidth = event.currentTarget.innerWidth - 10;
    this.winHeight = event.currentTarget.innerHeight;
    this.width = event.currentTarget.innerWidth;
    this.detailsHeight = 250;
    this.mapHeight = event.currentTarget.innerHeight - (67 + this.detailsHeight);
    this.detailsTop = (67 + this.mapHeight);
  }

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
        // console.log("ListDetailComponent :: ngOnInit :: subscribe :: disableSideNavChanges$ ");
      }
    ); 
    window.dispatchEvent(new Event('resize'));    
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
    this.restaurant = restaurant;
    this.disableSideNav = true;
    this.dataService.changeDisableSideNav(this.disableSideNav);
  }

  onMouseOver(infoWindow, gm) {
    console.log("ListDetailComponent :: onMouseOver()");
    if (gm.lastOpen != null) {
        gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }

  private initializeMap() {
    console.log('ListDetailComponent :: initializeMap');
    this.restaurant = this.dataService.getSelectedRestaurant();
  }

}
