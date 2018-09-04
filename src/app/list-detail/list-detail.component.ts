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
    //if (this.disableSideNav == true) {
    this.winWidth = event.currentTarget.innerWidth;
    this.winHeight = event.currentTarget.innerHeight;
    this.width = event.currentTarget.innerWidth;
    this.detailsHeight = 250;
    this.mapHeight = event.currentTarget.innerHeight - (65 + this.detailsHeight);
    this.detailsTop = (65 + this.mapHeight);

  
    console.log("this.winHeight");
    console.log(this.winHeight);
    console.log("this.winWidth");
    console.log(this.winWidth);
    //}

    // this.vpWidth = (this.winWidth - (3 * this.pddng)) / 2;
    // this.rvpLeft = (this.vpWidth + (2 * this.pddng));
    // this.pvpHeight = (this.vpWidth * (9 / 16));
    // this.lvpTop = (this.toolbarHeight + (this.pddng * 2) + this.pvpHeight); 
    // this.lvpHeight = this.winHeight - (this.toolbarHeight + (this.pddng * 3) + this.pvpHeight); 
    // this.rvpHeight = (this.winHeight - (this.toolbarHeight + (this.pddng * 3))) / 2; 
    // this.vptTop = (this.toolbarHeight + this.pddng); 
    // this.rvpmTop = (this.toolbarHeight + (this.pddng * 2) + this.rvpHeight); 
    // this.rvpbTop = (this.toolbarHeight + (this.pddng * 2) + (this.rvpHeight)); 
    // this.searchInputWidth = (this.vpWidth * .85);
    // this.btnWidth = this.vpWidth - 48;
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
        // console.log("this.disableSideNav");
        // console.log(this.disableSideNav);
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
    console.log("restaurant.name: " + restaurant.name);
    this.restaurant = restaurant;
    //this.dataService.setSelectedRestaurant(restaurant);
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
