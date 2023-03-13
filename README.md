# POKEDEX-FRONTEND
Demo: [POKEDEX-FRONTEND](https://pokedex-alpha-lake.vercel.app/login)
(Pokedex-backend: https://github.com/Alonso-Pablo/pokedex-backend)

## Pre-requisitos:
- Tener instalado [Node v18 o mayor](https://nodejs.org/en/download/)
- Tener instalado [Git](https://github.com/git-guides/install-git)

## Para iniciar:
- Clonar y preparar el projecto:
```
git clone git@github.com:Alonso-Pablo/pokedex.git &&
cd pokedex &&
npm install
```
- Listo, correr el projecto con: `npm run dev`.


## Comandos:
- **Correr** en local:
  ```
  npm run dev  // Inicia la app en modo watch y los environment de environment.ts.
  ```

- Hacer **Build** de la app:
  ```
  npm run build:prod      // Build con los environment de environment.prod.ts
  npm run build:staging   // Build con los environment de environment.staging.ts
  ```
