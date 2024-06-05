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

  function findDates(text) {
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
    const idString = /ID:([0-9]{6})/i;
    const match = idString.exec(text);
    if (match) {
      return match[1]; // Return just the ID part
    }
    return null;
  }

  const handleSubmit = async ({ personId, startDate, endDate, note }) => {
    try {
      await fetch('http://localhost:8000/api/time-offs/leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personId,
          startDate,
          endDate,
          note,
        }),
      });
      alert('Time-off request sent successfully');
    } catch (error) {
      console.error('Error sending time-off request:', error);
      alert('Failed to send time-off request');
    }
  };

  return (
    <div>
      <h2>Emails</h2>
      <ul>
        {emails.map(email => {
          const snippet = email.snippet || 'No snippet available';
          const match = findDates(snippet);
          const personId = findPersonID(snippet);
          const subject = email.subject || 'No Subject';

          return (
            <li key={email.id} className="p-4">
              <strong>Subject:</strong> {subject}
              <br />
              <strong>Snippet:</strong> {snippet}
              <br />
              <strong>Dates:</strong> {match ? `Start: ${match.startDate}, End: ${match.endDate}` : ''}
              <br />
              <strong>Person ID:</strong> {personId ? `${personId}` : ''}
              <br />
              {match && personId && (
                <DetailForm
                  email={email}
                  personId={personId}
                  startDate={match.startDate}
                  endDate={match.endDate}
                  onSubmit={handleSubmit}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmailList;
