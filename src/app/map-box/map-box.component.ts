import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Restaurant } from '../model/restaurant';
// import * as mapboxgl from 'mapbox-gl';
// import { GeoJson, FeatureCollection } from '../map';
//import { MapService } from '../service/map.service';


@Component({
  selector: 'map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss']
})
export class MapBoxComponent implements OnInit{
  private restaurant: Restaurant;
  title: string = 'My first AGM project';
  // lat: number = 51.678418;
  // lng: number = 7.809007;

  // lat: number;
  // lng: number;

  /// default settings
  // map: mapboxgl.Map;
  // style = 'mapbox://styles/mapbox/outdoors-v9';

  //private lat: number = 32.95061646;
  //private lng: number = -96.81974196;

  private lat: number;
  private lng: number;

  // message = 'Hello World!';

  // data
  // source: any;
  // markers: any;

  // constructor(private mapService: MapService) {}
  constructor(private dataService: DataService) {}

  ngOnInit() {
    console.log('MapBoxComponent :: ngOnInit');
    // this._dataService.selectedRestaurantChanges$.subscribe(
    //   data => {
    //     this.restaurant = data;
    //     console.log("MapBoxComponent :: ngOnInit");
    //     console.log("this.restaurant");
    //     console.log(this.restaurant);
    //     //this.lat = this.restaurant.location.lat;
    //     //this.lng = this.restaurant.location.lng;
    //   }
    //);    
    //this.markers = this.mapService.getMarkers()
    this.initializeMap()
  }

  private initializeMap() {
    console.log('MapBoxComponent :: initializeMap');
    this.restaurant = this.dataService.getSelectedRestaurant();
    this.lat = this.restaurant.location.lat;
    this.lng = this.restaurant.location.lng;
  //   /// locate the user
  //   // if (navigator.geolocation) {
  //   //    navigator.geolocation.getCurrentPosition(position => {
  //   //     this.lat = position.coords.latitude;
  //   //     this.lng = position.coords.longitude;
  //   //     this.map.flyTo({
  //   //       center: [this.lng, this.lat]
  //   //     })
  //   //   });
  }

  //   //this.buildMap()

  // }

  // buildMap() {
  //   this.map = new mapboxgl.Map({
  //     container: 'map',
  //     style: this.style,
  //     zoom: 13,
  //     center: [this.lng, this.lat]
  //   });


    /// Add map controls
    //this.map.addControl(new mapboxgl.NavigationControl());


    //// Add Marker on Click
    // this.map.on('click', (event) => {
    //   const coordinates = [event.lngLat.lng, event.lngLat.lat]
    //   const newMarker   = new GeoJson(coordinates, { message: this.message })
    //   //this.mapService.createMarker(newMarker)
    // })


    /// Add realtime firebase data on map load
    // this.map.on('load', (event) => {

    //   /// register source
    //   this.map.addSource('firebase', {
    //      type: 'geojson',
    //      data: {
    //        type: 'FeatureCollection',
    //        features: []
    //      }
    //   });

      /// get source
      //this.source = this.map.getSource('firebase')

      /// subscribe to realtime database and set data source
      // this.markers.subscribe(markers => {
      //     let data = new FeatureCollection(markers)
      //     this.source.setData(data)
      // })

      /// create map layers with realtime data
  //     this.map.addLayer({
  //       id: 'firebase',
  //       source: 'firebase',
  //       type: 'symbol',
  //       layout: {
  //         'text-field': '{message}',
  //         'text-size': 24,
  //         'text-transform': 'uppercase',
  //         'icon-image': 'rocket-15',
  //         'text-offset': [0, 1.5]
  //       },
  //       paint: {
  //         'text-color': '#f16624',
  //         'text-halo-color': '#fff',
  //         'text-halo-width': 2
  //       }
  //     })

  //   })

  // }


  /// Helpers

  // removeMarker(marker) {
  //   this.mapService.removeMarker(marker.$key)
  // }

  // flyTo(data: GeoJson) {
  //   this.map.flyTo({
  //     center: data.geometry.coordinates
  //   })
  // }
}