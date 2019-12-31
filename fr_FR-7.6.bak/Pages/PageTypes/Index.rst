.. include:: ../../Includes.txt


.. _pages-types:

Les types de page
^^^^^^^^^^^^^^^^^

TYPO3 CMS offre par défaut de nombreux types de pages utiles.
Ils sont rapidement décrits dans ce chapitre.

Standard
  Comme son nom l'indique c'est le type de page par défaut et le plus
  commun que vous allez utiliser. Il couvre tous les besoins de base.

Raccourci
  Un raccourci vers une autre page dans l'arborescence de page.
  Lorsque les utilisateurs accèdent à une telle page, ils sont
  redirigés en toute transparence à la destination du raccourci.

Lien vers URL externe
  Ce type est similaire au type "raccourci" mais il conduit
  l'utilisateur vers une page d'un autre site web.

Point de montage
  Un point de montage vous permet de sélectionner une autre page dans
  l'arborescence de page. Toutes les pages filles de la page choisie
  apparaissent comme les pages filles du point de montage.
  En effet, cela vous permet de dupliquer une partie de votre arborescence
  de pages en termes de navigation, sans réellement dupliquer les pages
  et contenu dans le backend.

  Bien que parfois difficile à utiliser, les points de montage sont
  une fonctionnalité très puissante de TYPO3 CMS.

Dossier
  Une page de type dossier est simplement un conteneur.
  Il n'apparaîtra pas dans le frontend. Il est généralement utilisé
  pour stocker des enregistrements d'autres types que les pages
  ou les éléments de contenu.

Séparateur de menu
  Crée une séparation visuelle dans l'arborescence de page et,
  si elle est configurée, également dans la navigation en frontend.
  La configuration de séparateurs de menu dans le frontend
  est réalisée en utilisant TypoScript.

Corbeille
  Ce type est similaire au type "Dossier", mais indique que le contenu
  est destiné à être supprimé. Cependant, il n'offre aucune fonction de nettoyage.
  Il a juste une indication visuelle.

Section d'utilisateur Backend
  Cette page apparaîtra dans le frontend seulement pour un groupe
  spécifique d'utilisateurs backend (ce qui signifie que vous devez
  être connecté au backend pour voir ces pages).