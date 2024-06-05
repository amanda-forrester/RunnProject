import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

const DetailForm = ({ personId, startDate, endDate, status, onStatusChange }) => {
  const [note, setNote] = useState('');
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Start with dialog closed

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/time-offs/leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ personId, startDate, endDate, note }),
      });

      if (!response.ok) {
        throw new Error('Failed to send time-off request');
      }

      alert('Time-off request sent successfully');
      setIsOpen(false); // Close the dialog on success
      onStatusChange('approved'); // Notify parent of status change
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to send time-off request');
    }
  };

  const handleReject = () => {
    onStatusChange('rejected'); // Notify parent of status change
    setIsOpen(false); // Close the dialog
  };

  return (
    <div>
      {status === 'needs approval' || status === undefined ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Needs Approval</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Time Off Approval Form</DialogTitle>
              <DialogDescription>
                Please review the details and confirm. Fill in notes if desired.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Employee ID:</label>
                <input type="text" value={personId} readOnly />
              </div>
              <div>
                <label>Start Date:</label>
                <input type="text" value={startDate} readOnly />
              </div>
              <div>
                <label>End Date:</label>
                <input type="text" value={endDate} readOnly />
              </div>
              <div>
                <label>Note:</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <br />
              <div className="flex space-x-2">
                <button type="submit" className="bg-lime-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Approve</button>
                <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleReject}>Reject</button>
              </div>
              {error && <p>{error}</p>}
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <button className="bg-gray-500 text-white font-bold py-1 px-2 rounded" disabled>
          {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Status Unknown'}
        </button>
      )}
    </div>
  );
};

export default DetailForm;
