import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-connexion',
  imports: [MatButtonModule, FormsModule,ReactiveFormsModule, MatInputModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  notification = inject(NotificationService);
  router = inject(Router);
  authService = inject(AuthService);

  formulaire = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  });
  
  onConnection () {
    this.http
      .post('http://localhost:5000/connexion', this.formulaire.value, {
        responseType :'text',
      })
      .subscribe((jwt) => {
        this.authService.decodeJwt(jwt);

        //Notif de connexion et redirection
        this.notification.show("Vous êtes connecté", "valid");
        this.router.navigateByUrl('/accueil');
      });
  }
}
