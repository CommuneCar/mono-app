# General deployment of this BE
## Configuration
1. Copy `.env.example` and create a local `.env` file.
2. Configure the values in the local `.env` file accordingly.

## Install dependencies:
```bash
npm install
```

## Instantiate prisma schemas:
```bash
npx prisma generate
```

## Run the project:
In dev mode:
```bash
npm run dev
```

In production mode:
```bash
npm start
```