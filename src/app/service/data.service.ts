import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Restaurants } from '../model/restaurants';
import { Restaurant } from '../model/restaurant';


@Injectable()
export class DataService {

  private selectedRestaurant: Restaurant;

  private selectedRestaurantSource = new Subject<Restaurant | null>();
  selectedRestaurantChanges$ = this.selectedRestaurantSource.asObservable();

  constructor(private http: HttpClient) { }

  setSelectedRestaurant(selectedRestaurtant: Restaurant | null): void {
    console.log("setSelectedRestaurant :: selectedRestaurtant");
    this.selectedRestaurant = selectedRestaurtant;
  }

  getSelectedRestaurant(): Restaurant {
    console.log("setSelectedRestaurant :: selectedRestaurtant");
    return this.selectedRestaurant;
  }

  changeSelectedRestaurant(selectedRestaurtant: Restaurant | null): void {
    console.log("changeSelectedRestaurant :: selectedRestaurtant");
    //console.log(selectedRestaurtant);
    this.selectedRestaurantSource.next(selectedRestaurtant);
  }

  public getRestaurants(): Observable<Restaurants> {
    const url = 'https://s3.amazonaws.com/br-codingexams/restaurants.json';
    return this.http.get<Restaurants>(url);
      //.catch(this.errorHandler);
  }

  private errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error || 'Sever error');
  }

} 
