import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
//import { Restaurant } from '../model/restaurant';
import { Restaurants } from '../model/restaurants';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  public getRestaurants() {
    const url = 'https://s3.amazonaws.com/br-codingexams/restaurants.json';
    return this.http.get<Restaurants>(url);
    //.catch(this.errorHandler);
  }

  // public getRestaurants() {
  //   const url = 'https://s3.amazonaws.com/br-codingexams/restaurants.json';
  //   return this.http.get<Restaurant[]>(url);
  //   //.map(result => result);
  //   //return this.http.get<Restaurant>(url);
  // }

  private errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error || 'Sever error');
  }

} 
