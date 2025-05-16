import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

interface Citation {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal?: string;
  doi?: string;
  url: string;
}

const Citations: React.FC = () => {
  const [citations, setCitations] = useState<Citation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCitations = async () => {
      try {
        const response = await axios.get('/api/citations');
        setCitations(response.data);
      } catch (error) {
        console.error('Failed to fetch citations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCitations();
  }, []);

  const removeCitation = async (id: string) => {
    try {
      await axios.delete(`/api/citations/${id}`);
      setCitations(citations.filter(citation => citation.id !== id));
    } catch (error) {
      console.error('Failed to remove citation:', error);
    }
  };

  const copyToClipboard = (citation: Citation) => {
    const citationText = `${citation.authors.join(', ')} (${citation.year}). ${citation.title}. ${citation.journal ? `${citation.journal}.` : ''} ${citation.doi ? `DOI: ${citation.doi}` : ''}`;
    navigator.clipboard.writeText(citationText);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Citations</h2>
      
      {citations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No saved citations yet. Search for papers to add citations.
        </div>
      ) : (
        <div className="space-y-4">
          {citations.map((citation) => (
            <div key={citation.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <a href={citation.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                      {citation.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 mb-1">
                    {citation.authors.join(', ')} • {citation.year}
                  </p>
                  {citation.journal && (
                    <p className="text-gray-600 mb-1">{citation.journal}</p>
                  )}
                  {citation.doi && (
                    <p className="text-gray-600">DOI: {citation.doi}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(citation)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    title="Copy citation"
                  >
                    <DocumentDuplicateIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => removeCitation(citation.id)}
                    className="p-2 text-red-500 hover:text-red-700"
                    title="Remove citation"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Citations; 