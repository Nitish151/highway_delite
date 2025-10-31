# BookIt Server (Backend)

## Development

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Server runs on `http://localhost:5000`

## Database

View database:
```bash
npx prisma studio
```

## Environment Variables

Create `.env`:
```
NODE_ENV=development
PORT=5000
DATABASE_URL="file:./dev.db"
```
