import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Mapbox
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
(mapboxgl as any).accessToken = 'pk.eyJ1IjoidHVjbm8iLCJhIjoiY2xiczNtancwMDN4NTNwcXVxeWplYXIxMiJ9.hPham_rgmPnLF4ldd4eckQ'; // access token de mapbox para poder usar el mapa

// Modulos
import { MapsRoutingModule } from './maps-routing.module';

// Componentes
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';

// Componentes standalone
import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';


@NgModule({
  declarations: [
    MiniMapComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    CounterAloneComponent,

    // standalone
    SideMenuComponent
  ]
})
export class MapsModule { }
