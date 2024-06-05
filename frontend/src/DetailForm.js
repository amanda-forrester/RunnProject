/*import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./components/ui/dialog"
  

const DetailForm = () => {

    return (
        <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Time Off Approval Form</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

}

export default DetailForm;*/


import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

const DetailForm = ({ personId, startDate, endDate }) => {
  const [note, setNote] = useState('');
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to send time-off request');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Needs Approval</DialogTrigger>
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
            <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsOpen(false)}>Reject</button>
          </div>
          {error && <p>{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DetailForm;
