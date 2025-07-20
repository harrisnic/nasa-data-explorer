# Mars Explorer API

This is the API server component of the Mars Explorer application, providing a robust backend service for accessing and managing Mars rover photography data. This API serves as the intermediary between the frontend application and NASA's Mars Rover Photos API.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository: `git clone https://github.com/harrisnic/nasa-data-explorer.git`
2. Navigate to: `cd backend`
3. Install dependencies: `npm install`

## 🛠️ Tech Stack

- [Express](https://expressjs.com/) - Web framework
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Swagger/OpenAPI](https://swagger.io/) - API documentation
- [Jest](https://jestjs.io/) - Testing framework
- [Morgan](https://github.com/expressjs/morgan) - HTTP request logger
- [Helmet](https://helmetjs.github.io/) - Security middleware
- [Express Validator](https://express-validator.github.io/) - Request validation
- [Express Rate Limit](https://github.com/express-rate-limit/express-rate-limit) - Rate limiting middleware
- [Axios](https://axios-http.com/) - HTTP client

## 🔧 Environment Variables

Create `.env.development` and `.env.production` files with the following variables:

Required environment variables:
- `PORT` - Server port number
- `NODE_ENV` - Environment (development/production)
- `NASA_API_KEY` - NASA API key for accessing rover data
- `API_RATE_LIMIT` - Rate limiting configuration
- `CORS_ORIGIN` - Allowed CORS origins

## 📝 Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript compiler checks

## 🔒 Security Features

- CORS protection
- Rate limiting
- Security headers (via Helmet)
- Request validation
- Error handling middleware

## 📚 API Documentation

API documentation is available at `/api-docs` when the server is running, powered by Swagger UI.

## 📜 License

MIT Licence
