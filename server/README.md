# Citė Server

The backend server for Citė, a research paper search and citation management platform powered by Perplexity's Sonar API.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the server directory with the following content:
   ```
   PORT=5000
   PERPLEXITY_API_KEY=your_api_key_here
   ```

3. Replace `your_api_key_here` with your actual Perplexity Sonar API key.

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Search
- `POST /api/search`
  - Search for research papers
  - Body: `{ query: string, filters?: { year?: number, author?: string, field?: string } }`

Note: All user data (citations, profile, etc.) is stored in the browser's localStorage for privacy and simplicity.

## Environment Variables

- `PORT`: Server port (default: 5000)
- `PERPLEXITY_API_KEY`: Your Perplexity Sonar API key

## Development

The server is built with:
- Node.js with TypeScript
- Express.js
- Perplexity Sonar API

To build the project:
```bash
npm run build
```

To run in production:
```bash
npm start
``` 