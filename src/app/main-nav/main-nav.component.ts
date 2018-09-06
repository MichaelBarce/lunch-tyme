import { Component, OnInit, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../service/data.service';
import { Restaurant } from '../model/restaurant';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  color = 'accent';
  checked = false;
  displayDetails: boolean;
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
  dialogData: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    this.winWidth = event.currentTarget.innerWidth;
    this.winHeight = event.currentTarget.innerHeight;
    this.width = event.currentTarget.innerWidth;
    this.detailsHeight = 225;
    this.mapHeight = this.winHeight - (65 + this.detailsHeight);
    this.detailsTop = (this.mapHeight);
  }

  constructor(
    private dataService: DataService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.disableSideNav = false;
    this.getRestaurants();
    window.dispatchEvent(new Event('resize'));
  }

  getRestaurants() {
    this.dataService
      .getRestaurants()
      .subscribe(
        (data) => {
          this.restaurantList = data.restaurants;
          this.restaurant = this.validateRestaurant(data.restaurants[0]);
          this.displayDetails = true;
        },
        (err: HttpErrorResponse) => {
          if (err instanceof Error) {
            this.dialogData = `An error occurred: ${err.error.message}`;
          } else {
            this.dialogData = `Backend returned error code ${err.status}. Message: ${err.message}`;
          }
          this.openDialog();
        }
      );
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.dialogData;
    dialogConfig.role = 'alertdialog';
    dialogConfig.height = '300px';
    dialogConfig.width = '600px';
    this.dialog.open(DialogBodyComponent, dialogConfig);
  }

  validateRestaurant(restaurant): Restaurant {

    // This validation approach is far from ideal.
    // I beleive that there may be a way to perform type checking
    // on the JSON feed and to supply default values when the feed
    // fails to provide certain fields/types (Contact data for Chuy's & Pluckers Wing Bar)
    // Finding relevant documentation and getting an alternative approach
    // to work was taking too long. While the current approach is less than optimal,
    // it at least prevents a crash and displays something meaningful to the user.

    let defaultContact;

    if (restaurant.contact === null || restaurant.contact === undefined) {
      defaultContact =  {
        phone: 'phone: not provided',
        formattedPhone: 'formattedPhone: not provided',
        twitter: 'twitter: not provided'
      };
    } else {
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
    };
    return validatedRestaurant;
  }

  viewDetails(restaurant) {
    this.restaurant = this.validateRestaurant(restaurant);
    this.displayDetails = true;
  }

  onMouseOver(infoWindow, gm) {
    if (gm.lastOpen != null) {
        gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }

}
