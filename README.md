# OpenClassrooms - Développeur React P9 - Migrez du code JavaScript vers TypeScript

## 🌱 LMJ - Application de Vente de Plantes

Une application React moderne pour la vente de plantes d'intérieur et d'extérieur, construite avec Vite, TypeScript et React Router.

## 🚀 Technologies Utilisées

- **React 19** 
- **TypeScript**
- **Vite**
- **React Router DOM**
- **ESLint**

## 📁 Structure du Projet

```
src/
├── assets/          # Images des plantes
├── components/      # Composants React
│   ├── layout/     # Composants de mise en page
│   └── ui/         # Composants d'interface
├── datas/          # Données des plantes
├── hooks/          # Hooks personnalisés
├── pages/          # Pages de l'application
├── services/       # Services (paiement)
├── styles/         # Fichiers CSS
└── types/          # Types TypeScript partagés (plantes, panier, paiement)
```

## 🛍️ Fonctionnalités

- **Catalogue de plantes** : Affichage des plantes avec filtres par catégorie
- **Panier d'achat** : Ajout/suppression de produits, gestion des quantités
- **Pages détaillées** : Informations complètes sur chaque plante
- **Système de paiement** : Intégration de formulaire de paiement
- **Responsive design** : Interface adaptée mobile et desktop

## 🚀 Installation et Démarrage

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone [url-du-repo]

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173`

### Scripts Disponibles

```bash
npm run dev      # Démarre le serveur de développement
npm run build    # Compile l'application pour la production
npm run preview  # Prévisualise la version de production
npm run lint     # Lance ESLint pour vérifier le code
```

## 🏗️ Configuration Technique

### Vite

Ce projet utilise Vite comme build tool pour un développement rapide avec HMR (Hot Module Replacement).

### TypeScript

Configuration TypeScript avec support complet pour React et les fonctionnalités modernes.

### ESLint

Configuration ESLint avec règles recommandées pour TypeScript et React.

## 📦 Dépendances Principales

- `react` & `react-dom` : Interface utilisateur
- `react-router-dom` : Navigation entre pages
- `typescript` : Typage statique
- `vite` : Build tool et dev server

## 🎨 Architecture

L'application suit une architecture modulaire avec :

- **Composants réutilisables** dans `src/components/`
- **Pages** dans `src/pages/` pour chaque route
- **Hooks personnalisés** dans `src/hooks/` pour la logique métier
- **Données** centralisées dans `src/datas/`


## 🔄 Migration vers TypeScript

Le code JavaScript d'origine (`.js` / `.jsx`) a été migré vers TypeScript (`.ts` / `.tsx`) **sans modifier la logique existante** : seuls des types et des annotations ont été ajoutés.

### Démarche

La migration a été faite des « feuilles » vers la « racine », afin de pouvoir vérifier chaque étape :

1. **Types du domaine** (`src/types/`) : `Plant`, `CartItem`, `AddToCart`, ainsi que les types de paiement
2. **Données** : `datas/plantList.ts`
3. **Hooks et services** : `useCart`, `usePayment`, `usePaymentForm`, `paymentService`
4. **Composants** : `Banner`, `Footer`, `CareScale`, `Categories`, `PlantItem`, `ShoppingList`, `PaymentForm`
5. **Pages**, puis `App` : `HomePage`, `NotFoundPage`, `PlantDetailPage`, `CartPage`

### Types partagés (`src/types/`)

| Fichier | Contenu |
|---|---|
| `plant.ts` | `Plant`, `CartItem`, `AddToCart` |
| `payment.ts` | `PaymentMethod`, `PaymentData`, `TransactionResult`, `PaymentErrors` |

Quelques choix de typage :

- `category`, `light` et `water` sont des **unions de littéraux** (`"classique" | "extérieur" | "plante grasse"`, `1 | 2 | 3`) plutôt que des `string` / `number`, pour que le compilateur détecte les valeurs invalides.
- Les états initialisés à `null` sont typés explicitement (`useState<TransactionResult | null>(null)`) afin de conserver la valeur de départ d'origine.
- Quelques casts (`as keyof PaymentMethod`, `(error as Error).message`) subsistent aux frontières avec des valeurs non typées (`e.target.name`, `catch`), pour ne pas modifier le comportement du code existant.

### Vérifications

```bash
npx tsc -b       # vérification des types
npm run build    # compilation de production
npm run lint     # ESLint
```

L'application a également été testée manuellement après la migration : le comportement est identique à celui du code JavaScript d'origine.

### ⚠️ Point d'attention : deux formes d'articles dans le panier

La migration a mis en évidence une incohérence du code d'origine : la fonction `addToCart` (`src/hooks/useCart.ts`) reçoit des objets de **forme différente** selon la page d'où l'on ajoute au panier.

| Origine | Objet envoyé |
|---|---|
| Liste de plantes (`ShoppingList`) | `{ name, price }` uniquement |
| Page détail (`PlantDetailPage`) | la `Plant` complète (`cover`, `description`, etc.) |

Seuls `name`, `price` et `amount` sont lus ensuite par le panier (`CartPage`, `Banner`). Les types reflètent donc la réalité :

- `AddToCart` reçoit une `Plant` complète
- `CartItem` vaut `Plant & { amount: number }`

**Conséquence :** les articles du panier (et ceux enregistrés dans le `localStorage`) peuvent contenir des champs supplémentaires selon leur provenance. Le typage ne les expose pas, et le code actuel n'en dépend pas.

**Piste d'amélioration (hors périmètre de la migration) :** faire envoyer le même objet depuis les deux pages (par exemple uniquement `{ name, price }`), ce qui nécessiterait de modifier le code existant. À planifier avant d'ajouter de nouvelles fonctionnalités liées au panier.
# reac
