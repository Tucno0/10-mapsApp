import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public zoom: number = 13;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.20840620043687, -13.188805421867741);

  ngAfterViewInit(): void {
    if( !this.divMap ) throw 'El elemento HTML no fue encontrado'; // si no existe el div con el mapa, no hago nada (por si acaso no existe)

    console.log(this.divMap);

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage(); // Se lee del local storage

    // const markerHtml = document.createElement('div'); // Se crea un elemento HTML que se va a mostrar en el mapa
    // markerHtml.innerHTML = 'Hola Mundo'; // Se le asigna un texto

    // const marker = new Marker({
    //   color: 'red',
    //   element: markerHtml, // En element se le asigna el elemento HTML que se va a mostrar en el mapa
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map);
  }

  createMarker(): void {
    if( !this.map ) return; // si no existe el mapa, no hago nada (por si acaso no existe)

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16)); // Genera un color aleatorio
    const lngLat = this.map.getCenter(); // Obtiene el centro del mapa

    this.addMarker( lngLat, color );
  }

  addMarker( lngLat: LngLat, color: string ): void {
    if( !this.map ) return; // si no existe el mapa, no hago nada (por si acaso no existe)

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map!);

    this.markers.push( {
      color: color, // Se agrega el color al array de markers
      marker: marker, // Se agrega el marker al array de markers
    } ); // Se agrega el marker al array de markers

    this.saveToLocalStorage( ); // Se guarda en el local storage
  }

  removeMarker( index: number ): void {
    if( !this.map ) return; // si no existe el mapa, no hago nada (por si acaso no existe)

    this.markers[index].marker.remove(); // Se remueve el marker del mapa
    this.markers.splice( index, 1 ); // Se remueve el marker del array de markers
  }

  flyTo( marker: Marker) {
    if( !this.map ) return; // si no existe el mapa, no hago nada (por si acaso no existe)

    this.map.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage(): void {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color, // Se agrega el color al array de markers, es una forma corta de color: color
        lngLat: marker.getLngLat().toArray(), // Se obtiene el lngLat del marker y se convierte a un array
      };
    });

    // console.log(plainMarkers);
    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ) );
  }

  readFromLocalStorage(): void {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]'; // Se obtiene el array de markers del local storage
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString ); // Se convierte el string a un array de markers

    plainMarkers.forEach( (plainMarker: PlainMarker) => {
      const { color, lngLat } = plainMarker; // Se obtiene el color y el lngLat del marker
      const [ lng, lat ] = lngLat; // Se obtiene el lng y el lat del marker mediante una destructuración de arreglos
      const coords = new LngLat( lng, lat ); // Se crea un objeto LngLat con el lng y el lat

      this.addMarker (coords, color ); // Se agrega el marker al mapa
    });
  }
}
