import React, { useState } from 'react';
import axios from 'axios';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface Paper {
  title: string;
  authors: string[];
  abstract: string;
  year: number;
  citations: number;
  url: string;
}

interface SearchFilters {
  year?: number;
  author?: string;
  field?: string;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/search', {
        query,
        filters
      });
      
      if (response.data && Array.isArray(response.data.papers)) {
        setPapers(response.data.papers);
      } else {
        setPapers([]);
        setError('Invalid response format from server');
      }
    } catch (error) {
      console.error('Search failed:', error);
      setPapers([]);
      setError('Failed to perform search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for papers, authors, or topics..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input
                  type="number"
                  value={filters.year || ''}
                  onChange={(e) => setFilters({ ...filters, year: parseInt(e.target.value) || undefined })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <input
                  type="text"
                  value={filters.author || ''}
                  onChange={(e) => setFilters({ ...filters, author: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Field</label>
                <input
                  type="text"
                  value={filters.field || ''}
                  onChange={(e) => setFilters({ ...filters, field: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </form>

      {error && (
        <div className="text-red-600 mb-4 text-center">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      ) : papers.length > 0 ? (
        <div className="space-y-6">
          {papers.map((paper, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <a href={paper.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                  {paper.title}
                </a>
              </h3>
              <p className="text-gray-600 mb-2">
                {paper.authors.join(', ')} • {paper.year}
              </p>
              <p className="text-gray-700 mb-4">{paper.abstract}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{paper.citations} citations</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No papers found. Try adjusting your search terms.
        </div>
      )}
    </div>
  );
};

export default Search; 