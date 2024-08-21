import { ListaLivrosComponent } from './views/lista-livros/lista-livros.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SobreComponent } from './views/sobre/sobre.component';
import { ContatoComponent } from './views/contato/contato.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'lista-livros',
    pathMatch: 'full',
    title: 'Busque um livro - Buscante'
  },
  {
    path: 'sobre',
    component: SobreComponent,
    title: 'Mais informações - Buscante'
  },
  {
    path: 'contato',
    component: ContatoComponent,
    title: 'Fale conosco - Buscante'
  },
  {
    path: 'lista-livros',
    component: ListaLivrosComponent,
    title: 'Buscante'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
