import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapasService {

  public userLocation!: [number,number];

  
  constructor(private http: HttpClient) { 
    this.getUserLocation();
  }
  
  get isUserLocationReady():boolean{
    return !!this.userLocation
  }

  public async getUserLocation(): Promise<[number,number]>{
    return new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(
        ({coords})=>{
          this.userLocation=[coords.longitude,coords.latitude];
          resolve(this.userLocation);
        },
        (err)=>{
          alert('No se pudo obtener la geolocalización');
          console.log(err);
          reject();
        }
      )
    })
  }

  getPLacesByQuery(query: string=''){
    this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=ec&proximity=-74.46687926408671%2C40.506327598964276&language=es&access_token=pk.eyJ1Ijoic2FudGlzZWJhczk3IiwiYSI6ImNscjA0NGdhMzBjazMyam4xeDB0NWxkeGwifQ.acrDJLugdhBCGArClZDR0A`)
  .subscribe(console.log)
  }

}
