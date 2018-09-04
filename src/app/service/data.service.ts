import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Restaurants } from '../model/restaurants';
import { Restaurant } from '../model/restaurant';

@Injectable()
export class DataService {

  private selectedRestaurant: Restaurant;

  private disableSideNavSource = new Subject<boolean | null>();
  disableSideNavChanges$ = this.disableSideNavSource.asObservable();

  constructor(private http: HttpClient) { }

  setSelectedRestaurant(selectedRestaurtant: Restaurant | null): void {
    //console.log("setSelectedRestaurant :: selectedRestaurtant");
    this.selectedRestaurant = selectedRestaurtant;
  }

  getSelectedRestaurant(): Restaurant {
    //console.log("setSelectedRestaurant :: selectedRestaurtant");
    return this.selectedRestaurant;
  }

  changeDisableSideNav(disableSideNav: boolean | null): void {
    //console.log("changeDisableSideNav :: disableSideNav");
    this.disableSideNavSource.next(disableSideNav);
  }

  public getRestaurants(): Observable<Restaurants> {
    const url = 'https://s3.amazonaws.com/br-codingexams/restaurants.json';
    return this.http.get<Restaurants>(url);
  }

  private errorHandler(error: Response) {
    //console.log(error);
    return Observable.throw(error || 'Sever error');
  }

} 
