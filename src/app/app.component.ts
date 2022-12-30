import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  y = [1, 5, 7, 9, 3, 4, 7, 15, 20, 6, 11, 30]
  Xlabel = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

}
