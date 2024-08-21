import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  contatoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.contatoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      motivoContato: [''],
      melhorFormaContato: ['email'],
      mensagem: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.contatoForm.valid) {
      this.contatoForm.reset();
    }
  }

  cancelar() {
    this.contatoForm.reset();
    this.router.navigateByUrl('/');
  }

}
