# Documentació del servidor

Aquest servidor gestiona usuaris, contingut de LaLliga i golejadors amb autenticació. L’usuari ha de fer login per accedir als continguts protegits.

## Funcionament
1. L’usuari es registra (`/register`) o fa login (`/login`).
2. Si el login és correcte, podra entrar i gestionar els CRUDs.
3. L’usuari pot tancar sessió amb `/logout`, eliminant la cookie.

## Rutes Principals

| Ruta              | Descripció                                   |
|------------------|---------------------------------------------|
| `/`               | Mostra pàgina de login                     |
| `/register`       | Crea un usuari amb username i password |
| `/login`          | Login: retorna usuari i JWT, guarda cookie |
| `/logout`         | Esborra la cookie de sessió               |
| `/golejadors`     | Rutes per a golejadors (CRUD)             |
| `/laliga`         | Rutes per la classificació (CRUD)           |
