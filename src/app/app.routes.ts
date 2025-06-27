import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { Page404Component } from './pages/page404/page404.component';
import { EditMaterielComponent } from './pages/edit-materiel/edit-materiel.component';
import { vendeurGuard } from './services/vendeur.guard';

export const routes: Routes = [
    {path: "accueil", component : AccueilComponent},
    {path: "connexion", component : ConnexionComponent},
    {path: "inscription", component : InscriptionComponent},
    {path: "ajout-materiel", component : EditMaterielComponent, canActivate: [vendeurGuard]},
    {path: "modifier-materiel/:id", component : EditMaterielComponent, canActivate: [vendeurGuard]},
    {path: "", redirectTo: "accueil", pathMatch: "full"},
    {path: "**", component: Page404Component}
];
