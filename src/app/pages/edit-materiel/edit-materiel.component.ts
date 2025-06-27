import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from '../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-materiel',
  imports: [FormsModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './edit-materiel.component.html',
  styleUrl: './edit-materiel.component.scss'
})
export class EditMaterielComponent {
//constructeur de form
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  notification = inject(NotificationService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  formulaire = this.formBuilder.group({
    nom: ["", [Validators.required, Validators.maxLength(20)]],
    description: ["", [Validators.maxLength(50)]],
    capacite: ["", [Validators.pattern("^[0-9]+$")]]
  });
  materielEdite: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      parametres => {
        // si on est sur la page de modification
        if(parametres["id"]){
          this.http
            .get("http://localhost:5000/materiel/"+ parametres['id'])
            .subscribe((materiel : any)=>{
              // hydratation des champs du form avec le materiel retourné
              console.log(materiel);
              this.formulaire.patchValue({
                nom: materiel.name_materiel,
                description: materiel.description_materiel,
                capacite: materiel.capacite_materiel
              });
              this.materielEdite = materiel;
            });
        }
      }
    )
  }

  onAjoutMateriel() {
    if (this.formulaire.valid) {

      if(this.materielEdite){
        //on modifie le produit
        this.http.put('http://localhost:5000/materiel/' + this.materielEdite.id_materiel, this.formulaire.value)
        .subscribe({
            next: (reponse) => {
              this.notification.show("Le produit a bien été modifié", "valid");
              this.router.navigateByUrl('/accueil');
            },
            error: (erreur) => {
              if (erreur.status === 409) {
                this.notification.show("Un produit porte déjà ce nom", "error");
              };
            },
        });
      }else{
        // on ajout produit
        this.http
          .post("http://localhost:5000/materiel",
          this.formulaire.value,
          //{headers : {Authorization : token}} // 3eme parametre : les options avec l'en tete
          )
        .subscribe({
            next: (reponse) => {
              this.notification.show("Le produit a bien été ajouté", "valid");
              this.router.navigateByUrl('/accueil');
            },
            error: (erreur) => {
              if (erreur.status === 409) {
                this.notification.show("Un produit porte déjà ce nom", "error");
              };
            },
        });
      }
    }
  }
}
