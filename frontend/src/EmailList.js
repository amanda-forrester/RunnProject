import React, { useState, useEffect } from 'react';
import DetailForm from './DetailForm';

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailStatuses, setEmailStatuses] = useState({}); // Track statuses

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/emails');
        const data = await response.json();
        setEmails(data); // Assuming the response contains an array of email details
      } catch (error) {
        console.error('Error fetching emails:', error);
        setError('Failed to fetch emails');
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const handleStatusChange = (emailId, status) => {
    setEmailStatuses((prevStatuses) => ({
      ...prevStatuses,
      [emailId]: status,
    }));
  };

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

  return (
    <div>
      <ul>
        {emails.map(email => {
          const snippet = email.snippet || 'No snippet available';
          const match = findDates(snippet);
          const personId = findPersonID(snippet);
          const subject = email.subject || 'No Subject';
          console.log(email);
          const status = emailStatuses[email.id] || 'needs approval'; // Default status to 'needs approval'

          return (
            <li key={email.id} className="p-4">
              <div className={`bg-slate-100 mx-auto border-gray-500 border rounded-sm text-gray-700 mb-0.5 h-30 ${status === 'approved' ? 'border-l-8 border-green-600' : status === 'rejected' ? 'border-l-8 border-red-600' : 'border-l-8 border-yellow-600'}`}>
                <div className="flex p-3">
                  <div className="space-y-1 border-r-2 pr-3">
                    <div className="text-sm leading-5 font-semibold"><span className="text-xs leading-4 font-normal text-gray-500"> Person ID: </span> {personId ? `${personId}` : ''}</div>
                    <div className="text-sm leading-5 font-semibold"><span className="text-xs leading-4 font-normal text-gray-500 pr"> Start date: </span> {match ? `${match.startDate}` : ''}</div>
                    <div className="text-sm leading-5 font-semibold"><span className="text-xs leading-4 font-normal text-gray-500 pr"> End date: </span> {match ? `${match.endDate}` : ''}</div>
                  </div>
                  <div className="flex-1">
                    <div className="ml-3 space-y-1 border-r-2 pr-3">
                      <div className="text-base leading-6 font-normal"><strong>Subject: </strong>{subject}</div>
                      <div className="text-base leading-6 font-normal"><strong>Snippet: </strong>{snippet}</div>
                    </div>
                  </div>
                  <div className="ml-2 my-3 p-1 w-15">
                    {match && personId && (
                      <DetailForm
                        email={email}
                        personId={personId}
                        startDate={match.startDate}
                        endDate={match.endDate}
                        status={status} // Pass the status
                        onStatusChange={(newStatus) => handleStatusChange(email.id, newStatus)} // Handle status change
                      />
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmailList;
