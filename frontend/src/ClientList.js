import React, { useState, useEffect } from 'react';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/clients').then(r => r.json());
        setClients(response.values); // Accessing the 'values' key from the response
      } catch (error) {
        console.error('Error fetching clients:', error.response || error.message); // Log the exact error
        setError('Failed to fetch clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            <strong>Name:</strong> {client.name}<br />
            <strong>Website:</strong> <a href={client.website} target="_blank" rel="noopener noreferrer">{client.website}</a><br />
            <strong>Archived:</strong> {client.isArchived ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;