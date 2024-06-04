// src/components/EmailList.js
import React, { useState, useEffect } from 'react';
import DetailForm from './DetailForm';

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/emails').then(r => r.json());
        setEmails(response); // Assuming the response contains an array of email details
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
          <li key={email.id} className="p-4">
            <strong>Subject:</strong> {email.payload.headers.find(header => header.name === 'Subject')?.value || 'No Subject'}
            <br />
            <strong>Snippet:</strong> {email.snippet}
            <br />
            <strong>Match:</strong> {findMatch(email.snippet, "hiking")}
          </li>
        ))}
      </ul>
      <DetailForm/>
    </div>
  );
};

function findMatch(text, term) {
  const pattern = new RegExp(".{0,5}"+term+".{0,5}");
  const match = pattern.exec(text);
  return match? match[0] : "";
}

export default EmailList;

//personID = 5e8hjnnk8