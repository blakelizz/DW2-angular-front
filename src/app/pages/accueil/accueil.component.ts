import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-accueil',
  imports: [MatButtonModule, MatCardModule, RouterLink ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  http = inject(HttpClient);
  materiel: any = [];
  notification = inject(NotificationService);
  authService = inject (AuthService);
  
  //Déclancher dès que le compoosant est chargé
  ngOnInit(){
    this.raffraichirMateriel();
  }

  raffraichirMateriel() {
    this.http.get("http://localhost:5000/materiel/list")
    .subscribe(materiel => (this.materiel = materiel));
  }

  onClickSupressionMateriel(item : any) {
    if(confirm("Voulez-vous vraiment supprimer ce produit ?")) {
          this.http
            .delete("http://localhost:5000/materiel/" + item.id_materiel)
            .subscribe(reponse => {
              this.raffraichirMateriel()
              this.notification.show('Le produit à bien été supprimé', 'valid')
            })
    }
  }
}
