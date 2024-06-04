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



  function findMatch(text) {
    //const pattern = new RegExp(".{0,5}"+term+".{0,5}");
    const pattern = /(?:leave|time off)[^0-9]*(\d{4}-\d{1,2}-\d{1,2})(?:[^0-9]*to[^0-9]*(\d{4}-\d{1,2}-\d{1,2}))?/i;
    const match = pattern.exec(text);
    if (match) {
      const startDate = match[1];
      const endDate = match[2] || startDate; // if no end date, it's a single day
      return { startDate, endDate };
    }
    return null;
  }

  function findPersonID(text) {
    const idString = /(?:ID:)[A-Za-z0-9]{9}?/i;
    const person = idString.exec(text);
    if (person) {
      const personID = person[0];
      return personID;
    }
    return null;
  }


  return (
    <div>
      <h2>Emails</h2>
      <ul>
        {emails.map(email => {
          const match = findMatch(email.snippet);
          const person = findPersonID(email.snippet)
          return (
            <li key={email.id} className="p-4">
              <strong>Subject:</strong> {email.payload.headers.find(header => header.name === 'Subject')?.value || 'No Subject'}
              <br />
              <strong>Snippet:</strong> {email.snippet}
              <br />
              <strong>Dates:</strong> {match ? `Start: ${match.startDate}, End: ${match.endDate}` : ''}
              <br />
              <strong>Person ID:</strong> {person ? `${person}` : ''}
            </li>
          );
        })}
      </ul>
      <DetailForm />
    </div>
  );
};


export default EmailList;

//personID = 5e8hjnnk8