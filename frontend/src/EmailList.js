// src/components/EmailList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/emails');
        setEmails(response.data); // Assuming the response contains an array of email details
      } catch (error) {
        console.error('Error fetching emails:', error);
        setError('Failed to fetch emails');
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Emails</h2>
      <ul>
        {emails.map(email => (
          <li key={email.id}>
            <strong>Subject:</strong> {email.payload.headers.find(header => header.name === 'Subject')?.value || 'No Subject'}
            <br />
            <strong>Snippet:</strong> {email.snippet}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
