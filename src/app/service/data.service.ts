import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurants } from '../model/restaurants';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  public getRestaurants(): Observable<Restaurants> {
    const url = 'https://s3.amazonaws.com/br-codingexams/restaurants.json';
    // const url = 'https://s3.amazonaws.com/br-codingexams/unavailable.json';
    return this.http
      .get<Restaurants>(url);
  }

}

