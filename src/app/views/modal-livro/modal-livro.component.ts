import { Component, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { Livro } from 'src/app/models/interfaces';

const body = document.querySelector("body");

@Component({
  selector: 'app-modal-livro',
  templateUrl: './modal-livro.component.html',
  styleUrls: ['./modal-livro.component.css']
})
export class ModalLivroComponent {

  constructor(
    private renderer: Renderer2,
    private element: ElementRef
  ) { }

  @Input() livro: Livro;
  statusModal: boolean = true;
  @Output() mudouModal = new EventEmitter()

  @HostListener('document:keydown.escape') fecharModalAoApertarEsc() {
    if (this.statusModal) {
      this.fecharModal();
    }
  }

  fecharModal() {
    this.statusModal = false
    this.mudouModal.emit(this.statusModal)
    body.style.overflow = "scroll"

    this.renderer.setStyle(this.element.nativeElement.ownerDocument.body, 
      'overflow', 'scroll');    
  }

  esconderScroll(){
    if(this.statusModal == true ) {
      body.style.overflow = "hidden";
    }
  }

  lerPrevia() {
    window.open(this.livro.previewLink, '_blank');
  }

}
