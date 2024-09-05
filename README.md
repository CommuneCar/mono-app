
# 🚗 Communecar

**Communecar** is a carpooling platform designed for community-based ride-sharing. Users can search, create, and join rides based on the communities they belong to. Built with a modern tech stack, Communecar emphasizes speed, performance, and seamless user experience.

## 🛠️ Tech Stack

### Backend (BE) - NodeJS  
- **[Express](https://expressjs.com/)**: Fast, minimalist web framework  
- **[GraphQL](https://graphql.org/)**: API query language for interacting with data  
- **[Swagger](https://swagger.io/)**: API documentation and testing  
- **[Prisma](https://www.prisma.io/)**: Next-generation ORM for database interaction  
- **[Supabase (Postgres)](https://supabase.io/)**: Backend-as-a-Service built on top of PostgreSQL

### Frontend (FE) - React  
- **[Vite](https://vitejs.dev/)**: Lightning-fast frontend tooling  
- **[MUI](https://mui.com/)**: React components for faster and easier web development  
- **[Leaflet](https://leafletjs.com/)**: Interactive maps  
- **[React Query](https://tanstack.com/query/latest)**: Data-fetching and server-state management  
- **[Axios](https://axios-http.com/)**: Promise-based HTTP client

### Integrations 🌐  
- **[OpenStreetMap](https://www.openstreetmap.org/)**: Community-driven map data  
- **[Nominatim](https://nominatim.org/)**: Open-source search engine for geolocation  
- **[LocationIQ](https://locationiq.com/)**: High-performance geolocation services  
- **[Geocode.maps.co](https://geocode.maps.co/)**: Open geocoding API  
- **[GraphHopper](https://www.graphhopper.com/)**: Optimal route calculation  

### DevOps 🛠️  
- **CI/CD**: Vercel for deployment and continuous integration  
- **Docker Compose**: Container orchestration for local development  

## 🚀 Getting Started
### Clone the repo:
```bash
git clone https://github.com/CommuneCar/mono-app.git
cd mono-app
```

If you have Docker installed, we've made it extra easy for you. Once you've configured your `.env` variables, run the following command and you should be good to go:
```bash
docker-compose up -d
```

If you don't have Docker installed, please ensure that you have **Node.js** (v18+) and **npm** (v10+) installed.

### Starting the FE:
```bash
cd apps/ui
npm ci 
# Create a .env file based on the .env.example file
npm run dev
```

### Starting the BE:
```bash
cd apps/BE
npm i
# Create a .env file based on the .env.example file
npm run dev
```

Once done, the system should be accessible via the following URLs:
* FE: https://localhost:5173/
* BE: https://localhost:8001/

### Backend  
- The backend is powered by Node.js with Express, GraphQL, and Prisma.  
- API docs are accessible through Swagger at `/docs`.  
- GraphQL playground available at `/graphql` (api) and `/graphiql` (ui).

### Frontend  
- The frontend is a React application bootstrapped with Vite and styled with MUI.  
- Maps are rendered using Leaflet, with data from multiple geolocation providers.  

---

Feel free to fork, star ⭐, or give us a good grade 🔥🍾. Let’s make carpooling cool again! 😎🚀
