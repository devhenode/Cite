import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true, // This allows same-origin requests
  credentials: true
}));
app.use(express.json());

// Types
interface SearchQuery {
  query: string;
  filters?: {
    year?: number;
    author?: string;
    field?: string;
  };
}

interface Paper {
  title: string;
  authors: string[];
  abstract: string;
  year: number;
  citations: number;
  url: string;
}

interface SearchResponse {
  papers: Paper[];
  totalResults: number;
}

// Perplexity Sonar API configuration
const sonarApi = axios.create({
  baseURL: 'https://api.perplexity.ai/sonar/v1',
  headers: {
    'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Search route
app.post('/api/search', async (req, res) => {
  try {
    const { query, filters }: SearchQuery = req.body;
    
    // Construct the research query
    let researchQuery = query;
    if (filters) {
      if (filters.year) researchQuery += ` year:${filters.year}`;
      if (filters.author) researchQuery += ` author:"${filters.author}"`;
      if (filters.field) researchQuery += ` field:"${filters.field}"`;
    }

    const response = await sonarApi.post('/query', {
      query: researchQuery,
      mode: 'research',
      options: {
        citations: true,
        follow_up: true
      }
    });

    // Transform the response to match the Paper interface
    const papers: Paper[] = response.data.results.map((result: any) => ({
      title: result.title || '',
      authors: result.authors || [],
      abstract: result.abstract || '',
      year: result.year || new Date().getFullYear(),
      citations: result.citation_count || 0,
      url: result.url || ''
    }));

    res.json({
      papers,
      totalResults: response.data.total || 0
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to perform search', papers: [] });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 