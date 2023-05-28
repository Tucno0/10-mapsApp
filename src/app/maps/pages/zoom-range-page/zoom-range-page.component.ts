import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map2') divMap?: ElementRef;

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

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if ( !this.map ) throw 'No se ha inicializado el mapa';

    this.map.on('zoom', (ev) => {
      // console.log(ev);
      this.zoom = this.map!.getZoom() || 0;
    });

    this.map.on('zoomend', (ev) => {
      if ( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', (ev) => {
      this.currentLngLat = this.map!.getCenter();
      // const { lng, lat } = this.currentLngLat;
      // console.log({ lng, lat });
    });
  }

  zoomIn () {
    this.map?.zoomIn();
  }

  zoomOut () {
    this.map?.zoomOut();
  }

  zoomChanged( value: string ) {
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom );
  }

}
