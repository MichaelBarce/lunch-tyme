import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../service/data.service';
import { Restaurant } from '../model/restaurant';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
  animations: [
    trigger('itemAnimate', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('1s')
      ])
      ,
      transition(':leave', [
        animate('1s', style({transform: 'translate(100%)'}))
        ])
      ])
    ]
})

export class ListDetailComponent implements OnInit {

  disableSideNav: boolean;
  restaurant: Restaurant;
  validatedRestaurant: Restaurant;
  restaurantList: Restaurant[];
  winWidth: number | null;
  winHeight: number | null;
  width: number | null;
  mapHeight: number | null;
  detailsTop: number | null;
  detailsLeft: number | null;
  detailsWidth: number | null;
  detailsHeight: number | null;
  //message: string | null;
  dialogData: string;

  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    //console.log("sizeChange");
    this.winWidth = event.currentTarget.innerWidth - 10;
    this.winHeight = event.currentTarget.innerHeight;
    this.width = event.currentTarget.innerWidth;
    this.detailsHeight = 250;
    this.mapHeight = event.currentTarget.innerHeight - (65 + this.detailsHeight);
    this.detailsTop = (65 + this.mapHeight);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { 
    }

  ngOnInit() {
    //console.log("ListDetailComponent :: ngOnInit()");
    this.disableSideNav = false;
    this.dataService.changeDisableSideNav(this.disableSideNav);
    this.getRestaurants();
    this.dataService.disableSideNavChanges$.subscribe(
      data => {
        this.disableSideNav = data;
      }
    ); 
    window.dispatchEvent(new Event('resize'));    
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.dialogData;
    let dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);
  }

  getRestaurants() {
    this.dataService
      .getRestaurants()
      .subscribe(
        (data) => {
          this.restaurantList = data.restaurants;
          this.restaurant = this.validateRestaurant(data.restaurants[0]);
          this.dataService.setSelectedRestaurant(this.restaurant);
          console.log(this.restaurantList);
        },
        (err: HttpErrorResponse) => {
          if (err instanceof Error) {
            this.dialogData = `An error occurred ${err.error.message}`;
          } else {
            this.dialogData = `Backend returned error code ${err.status}, body was: ${err.message}`;
          }
          this.openDialog();
        }
      );
  }


  validateRestaurant(restaurant): Restaurant {
    //console.log("ListDetailComponent :: validateRestaurant()");
    // This validation approach is far from ideal.
    // I beleive that there may be a way to perform type checking 
    // on the JSON feed and to supply default values when the feed 
    // fails to define certain fields/types (Contact data for Chuy's & Pluckers Wing Bar)  
    // Finding relevant documentation and getting an alternative approach 
    // to work was taking too long. While the current approach is less than optimal, 
    // it at least prevents a crash and displays somethng meaningful to the user.

    var defaultContact;

    if (restaurant.contact === null || restaurant.contact === undefined){
      //console.log("ListDetailComponent :: Contact is null or undefined");
      defaultContact =  {
        phone: "phone: not provided",
        formattedPhone: "formattedPhone: not provided",
        twitter: "twitter: not provided"
      }
    }
    else {
      defaultContact = restaurant.contact;
    }

    const validatedRestaurant = {
      name: restaurant.name,
      backgroundImageURL: restaurant.backgroundImageURL,
      category: restaurant.category,
      contact: defaultContact,
      location: {
        address: restaurant.location.address,
        crossStreet: restaurant.location.crossStreet,
        lat: restaurant.location.lat,
        lng: restaurant.location.lng,
        cc: restaurant.location.cc,
        city: restaurant.location.city,
        state: restaurant.location.state,
        country: restaurant.location.country,
        postalCode: restaurant.location.postalCode,
        formattedAddress: restaurant.location.formattedAddress
      }
    }
    return validatedRestaurant;
  }

  viewDetails(restaurant){
    console.log("ListDetailComponent :: viewDetails()");
    this.restaurant = this.validateRestaurant(restaurant);
    this.disableSideNav = true;
    this.dataService.changeDisableSideNav(this.disableSideNav);
  }

  onMouseOver(infoWindow, gm) {
    //console.log("ListDetailComponent :: onMouseOver()");
    if (gm.lastOpen != null) {
        gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }

  private initializeMap() {
    //console.log('ListDetailComponent :: initializeMap');
    this.restaurant = this.dataService.getSelectedRestaurant();
  }

}
