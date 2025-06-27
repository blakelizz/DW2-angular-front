import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user : any;

  constructor() { 
    // Quand on arrive sur l'app et que l'user est déjà connecté on extrait les données du jwt stocké dans le localStorage
    const jwt = localStorage.getItem('token')

    if(jwt != null){
      this.decodeJwt(jwt);
    }
  }

  decodeJwt(jwt : string) {
    localStorage.setItem('token', jwt);

    const jwtParts = jwt.split("."); // découpe le jwt en 3 parties
    const jwtBodyBase64 = jwtParts[1]; // Récupère la partie data du jwt
    const jwtBodyDecoded = atob (jwtBodyBase64); // décode la base 64
    this.user = JSON.parse(jwtBodyDecoded); // on transforme le JSON on objet javascript
  }
  deconnexion(){
    localStorage.removeItem("token");
    this.user = null;
  }
}
