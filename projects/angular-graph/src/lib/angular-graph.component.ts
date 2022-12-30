import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'graph',
  templateUrl: './angular-graph.component.html',
  styleUrls: ['./angular-graph.component.scss']
})
export class AngularGraphComponent implements OnInit {

  #canvasRef!: HTMLCanvasElement
  #context: CanvasRenderingContext2D | null = null;
  @Input() width: number = 400;
  @Input() height: number = 400;
  //labels
  @Input() y_axis: Array<number> = []
  @Input() x_axis_labels: Array<string> = []
  @Input() y_label: string = "";
  @Input() x_label: string = "";
  @Input() fontColorLabels: string = 'inherit'
  @Input() fontSizeLabels: string = '12px'
  @Input() fontFamilyLabels: string = 'Arial'
  //title

  @Input() title: string = ''
  @Input() fontColorTitle: string = 'inherit'
  @Input() fontSizeTitle: string = '16px'
  @Input() fontFamilyTitle: string = 'Arial'

  @Input() BarWidth: number = 0.5;

  constructor() { }

  ngOnInit(): void {
    if (!this.y_axis.length || !this.x_axis_labels.length) {
      console.error('Faltan datos para dibujar el gráfico');
    }
    if (this.y_axis.length !== this.x_axis_labels.length) {
      console.error('y_axis y x_axis_labels deben tener el mismo tamaño',)
    }
  }

  @ViewChild('canvasRef')
  set canvasRef(element: ElementRef<HTMLCanvasElement>) {
    this.#canvasRef = element.nativeElement
    this.#context = this.#canvasRef.getContext('2d')
    if (!this.#context) return;
    this.#canvasRef.width = this.width
    this.#canvasRef.height = this.height


    const TEXT_SIZE = this.#context.measureText('A' + '')
    const PADDING = TEXT_SIZE.actualBoundingBoxAscent * 3

    this.#drawTitle(this.#context, this.title, this.fontColorTitle, this.fontSizeTitle, this.fontFamilyTitle)
    this.#drawXAxis(this.#context, this.fontColorLabels, this.fontSizeLabels, this.fontFamilyLabels, PADDING)
    this.#drawYAxis(this.#context, this.fontColorLabels, this.fontSizeLabels, this.fontFamilyLabels, PADDING)
    this.#drawBars(this.#context, PADDING)

  }

  @HostListener('click', ['$event.target']) onClick(element: any) {
    if (element != this.#canvasRef) return;
    this.#showClick()
  }

  readonly #showClick = () => {

  }

  readonly #drawXAxis = (context: CanvasRenderingContext2D, color: string, fontSize: string, fontFamily: string, PADDING: number) => {


    context.font = `${fontSize} ${fontFamily}`;
    context.fillStyle = color;

    // Calcula el intervalo entre las marcas del eje x
    const SIZE_DRAW_WIDTH = this.#canvasRef.width - PADDING * 2

    let numMarks = this.x_axis_labels.length + 1;
    let xInterval = SIZE_DRAW_WIDTH / (numMarks - 1);
    context.strokeStyle = "gray";
    context.lineWidth = 2;


    const BAR_WIDTH = xInterval * this.BarWidth; // Ancho de las barras

    // Dibuja las marcas y etiquetas en el eje x
    for (let i = 0; i < numMarks - 1; i++) {
      let x = (i * xInterval) + PADDING + xInterval / 2;
      const textWidth = context.measureText(this.x_axis_labels[i]).width;
      context.beginPath();
      context.moveTo(x + BAR_WIDTH / 2, this.#canvasRef.height - PADDING);
      context.lineTo(x + BAR_WIDTH / 2, this.#canvasRef.height - (PADDING - 5));
      context.stroke();
      context.fillText(this.x_axis_labels[i], x - (textWidth / 2) + (BAR_WIDTH / 2), this.#canvasRef.height - (PADDING - 15));
    }

    //dibuja la linea del eje x
    context.beginPath();
    context.moveTo(PADDING, this.#canvasRef.height - PADDING);
    context.lineTo(this.#canvasRef.width - PADDING, this.#canvasRef.height - PADDING);
    context.stroke();


  }

  readonly #drawYAxis = (context: CanvasRenderingContext2D, color: string, fontSize: string, fontFamily: string, PADDING: number, interval = 5) => {

    context.font = `${fontSize} ${fontFamily}`;
    context.fillStyle = color;


    const SIZE_DRAW_HEIGHT = this.#canvasRef.height - PADDING * 2
    const MAX_Y = this.y_axis.reduce((a, b) => { if (a > b) return a; return b }, 0);
    const CONVERTION = SIZE_DRAW_HEIGHT / MAX_Y;

    // Dibuja las marcas y etiquetas en el eje y
    for (let i = 0; i <= MAX_Y; i += interval) {
      let y = (this.#canvasRef.height - PADDING) - (i * CONVERTION);
      context.beginPath();
      context.moveTo(PADDING, y);
      context.lineTo(PADDING - 5, y);
      context.stroke();

      // Rotar el contexto antes de dibujar el texto
      context.save();
      const TEXT_SIZE = context.measureText(i + '')
      context.translate((PADDING / 2) - 10 - TEXT_SIZE.actualBoundingBoxAscent, y + (TEXT_SIZE.width / 2));
      context.rotate(-Math.PI / 2);
      context.fillText(i + '', 0, PADDING);
      context.restore(); // Rotar el contexto de vuelta a su posición original

    }


    context.beginPath();
    context.moveTo(PADDING, this.#canvasRef.height - PADDING);
    context.lineTo(PADDING, 0 + PADDING);
    context.stroke();



  }

  readonly #drawBars = (context: CanvasRenderingContext2D, PADDING: number) => {

    // Calcula el intervalo entre las marcas del eje x
    let numMarks = this.x_axis_labels.length + 1;
    const SIZE_DRAW_WIDTH = this.#canvasRef.width - PADDING * 2
    const SIZE_DRAW_HEIGHT = this.#canvasRef.height - PADDING * 2

    let xInterval = SIZE_DRAW_WIDTH / (numMarks - 1);
    let barWidth = xInterval * this.BarWidth; // Ancho de las barras

    //obtenemos el máximo valor en el eje para definir la escala
    const MAX_Y = this.y_axis.reduce((a, b) => { if (a > b) return a; return b }, 0);
    const CONVERTION = SIZE_DRAW_HEIGHT / MAX_Y;
    // Itera a través de los datos y dibuja las barras
    for (let i = 0; i < numMarks - 1; i++) {
      let x = (i * xInterval) + PADDING + xInterval / 2;
      let y = PADDING + CONVERTION * (MAX_Y - this.y_axis[i])


      context.fillStyle = "red"; // Establece el color de relleno para las barras
      context.fillRect(x, y, barWidth, CONVERTION * (this.y_axis[i])); // Dibuja la barra
    }
  }

  readonly #drawTitle = (context: CanvasRenderingContext2D, title: string, color: string, fontSize: string, fontFamily: string) => {
    context.save()
    context.font = `${fontSize} ${fontFamily}`;
    context.fillStyle = color;
    context.textAlign = "center";
    context.fillText(title, this.#canvasRef.width / 2, 20);
    context.restore()
  }
}
