import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap, throwError } from 'rxjs';
import { Item, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livro-volume-info';
import { LivroService } from 'src/app/service/livro.service';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-50px)' }),
          stagger('100ms', [
            animate('500ms ease-out', keyframes([
              style({ opacity: 0, transform: 'translateY(-50px)', offset: 0 }),
              style({ opacity: 0.5, transform: 'translateY(-25px)', offset: 0.3 }),
              style({ opacity: 1, transform: 'none', offset: 1 }),
            ])),
          ]),
        ], { optional: true }),
        query(':leave', [
          stagger('100ms', [
            animate('500ms ease-out', keyframes([
              style({ opacity: 1, transform: 'none', offset: 0 }),
              style({ opacity: 0.5, transform: 'translateY(-25px)', offset: 0.3 }),
              style({ opacity: 0, transform: 'translateY(-50px)', offset: 1 }),
            ])),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ]
})

export class ListaLivrosComponent implements AfterViewInit { //implements OnDestroy {

  //listaLivros: Livro[];
  campoBusca = new FormControl();
  //subscription: Subscription;
  //livro: Livro;
  mensagemErro = '';
  livrosResultado: LivrosResultado;
  listaLivros: LivroVolumeInfo[];
  @ViewChild('campoBuscaElement') campoBuscaElement!: ElementRef;

  constructor(private service: LivroService) { }

  ngAfterViewInit() {
    this.campoBuscaElement.nativeElement.focus();
  }

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length > 3),
      tap(() => console.log('Fluxo inicial')),
      distinctUntilChanged(),
      switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
      tap((retornoAPI) => console.log(retornoAPI)),
      map(resultado => this.livrosResultado = resultado),
      map(resultado => resultado.items ?? []),
      map((items) => this.listaLivros = this.livrosResultadoParaLivros(items)
      ),
      catchError((error) => {
        // this.mensagemErro = 'Erro na busca de livros. Recarregue a aplicação.'
        // return EMPTY;
        console.log(error);
        return throwError(() => new Error(this.mensagemErro = 'Erro na busca de livros. Recarregue a aplicação.'));
      })
    )

  // buscarLivros() {
  //   // observer
  //   this.subscription = this.service.buscar(this.campoBusca)
  //     .subscribe(
  //       {
  //         next: (items) => {     // pode ter varios next's
  //           console.log('Requisicoes ao servidor');
  //           this.listaLivros = this.livrosResultadoParaLivros(items);
  //         },
  //         error: (error) => {       // opcional
  //           console.error(error);
  //         },
  //         // complete: () => {         // opcional
  //         //   console.log('Observable completado.');
  //         // }
  //       }
  //     );
  // }

  // Pipe- Função que serve para agrupar múltiplos operadores. Não modifica o observable anterior.
  // Tap - Operador de serviços públicos. Usado para debugging. Não modifica o observable.
  // Map - Operador de transformação. Transforma o observable de acordo com a função passada. Retorna um observable modificado.

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => new LivroVolumeInfo(item));
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}
