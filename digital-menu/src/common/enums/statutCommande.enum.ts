export enum StatutCommande {

    EN_ATTENTE = 'en_attente',//la commande vient d’être passée, pas encore traitée.
    EN_COURS = 'en_cours', //en cours de préparation.
    PRETE = 'prête',
    LIVREE = 'livrée',
    ANNULEE = 'annulée', //par le client ou le restaurant.
    ECHOUEE = 'échouée', //la commande n’a pas pu être traitée (ex: problème de paiement)
  }
