import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Livro } from 'src/app/models/interfaces';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent {

  @Input() livro: Livro;
  modalAberto: boolean;

  constructor(
    private renderer: Renderer2,
    private element: ElementRef
  ) { }

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
    this.renderer.setStyle(this.element.nativeElement.ownerDocument.body, 
      'overflow', 'hidden');
  }
}
