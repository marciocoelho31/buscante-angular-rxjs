import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Livro[];
  campoBusca: string = '';
  subscription: Subscription;
  livro: Livro;

  constructor(private service: LivroService) { }

  buscarLivros() {
    // observer
    this.subscription = this.service.buscar(this.campoBusca)
      .subscribe(
        {
          next: (items) => {     // pode ter varios next's
            this.listaLivros = this.livrosResultadoParaLivros(items);
          },
          error: (error) => {       // opcional
            console.error(error);
          },
          // complete: () => {         // opcional
          //   console.log('Observable completado.');
          // }
        }
      );
  }

  // Pipe- Função que serve para agrupar múltiplos operadores. Não modifica o observable anterior.
  // Tap - Operador de serviços públicos. Usado para debugging. Não modifica o observable.
  // Map - Operador de transformação. Transforma o observable de acordo com a função passada. Retorna um observable modificado.

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => new LivroVolumeInfo(item));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
