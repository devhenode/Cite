# Citė - For Research

A modern research paper search and citation management platform powered by Perplexity's Sonar API. This application provides researchers with powerful tools to search academic papers, manage citations, and collaborate with other researchers.

## Features

- Real-time academic paper search using Perplexity Sonar API
- Advanced filtering and sorting options
- Citation management and export (stored locally in browser)
- Paper recommendations
- User profiles and research interests (stored locally in browser)

## Tech Stack

- Frontend: React with TypeScript
- Backend: Node.js with Express
- API: Perplexity Sonar API
- Styling: Tailwind CSS
- Storage: Browser's localStorage

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```
3. Create a `.env` file in the server directory with your Perplexity API key:
   ```
   PERPLEXITY_API_KEY=your_api_key_here
   ```
4. Start the development servers:
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Documentation

The backend provides the following endpoint:

- `POST /api/search` - Search for papers using Perplexity Sonar API

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests. 