import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Map } from 'mapbox-gl';  // importo mapbox

@Component({
  selector: 'app-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map')
  public divMap?: ElementRef; // referencia al elemento html con el id map (div con el mapa)

  ngAfterViewInit(): void {
    if( !this.divMap ) throw 'El elemento HTML no fue encontrado'; // si no existe el div con el mapa, no hago nada (por si acaso no existe)

    console.log(this.divMap);

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}
