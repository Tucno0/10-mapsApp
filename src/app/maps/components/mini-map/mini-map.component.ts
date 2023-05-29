import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit{

  @Input() lngLat?: [number, number];

  @ViewChild('map')
  public divMap?: ElementRef; // referencia al elemento html con el id map (div con el mapa)

  ngAfterViewInit(): void {
    if( !this.divMap?.nativeElement) throw 'Map Div not found'; // si no existe el div con el mapa, no hago nada (por si acaso no existe)
    if( !this.lngLat ) throw "lngLat can't be null";

    // mapa
    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    })

    //marker
    const marker = new Marker({
      color: '#FF0000',
      draggable: false
    })
      .setLngLat(this.lngLat)
      .addTo(map);
  }
}
