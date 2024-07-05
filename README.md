# Runn Time-Off App

## Overview

The Runn Time-Off App is a web application designed to streamline the process of managing and approving time-off requests. It automatically reads gmail emails related to time-off requests and presents them in an easy-to-review format. It parses out the requested time off dates and employee ID information from the email. Users can approve or reject requests directly from the application, with visual indicators to show the status of each request. Once approved, the app POSTs the time off data to Runn's API.

## Features

- **Automatic Email Parsing**: Automatically reads and parses emails for time-off requests.
- **Detail Form**: Displays the details of each request and allows for notes to be added.
- **Approve/Reject Functionality**: Users can approve or reject requests with a single click.
- **Status Indicators**: Visual indicators to show whether a request has been approved or rejected.
- **Error Handling**: Provides error messages if the time-off request fails to send.

## Installation

### Frontend

1. **Clone the repository**:
   ```bash
   git clone https://github.com/amanda-forrester/RunnProject.git
2. **Navigate to the project directory and then the frontend folder**:
   ```bash
   cd frontend
3. **Install the dependencies**:
   ```bash
   npm install
4. **Start the server**:
   ```bash
   npm start
  **Your app should now be running on server http://localhost:3000**
### Backend
   
1. **Navigate to the backend**:
   ```bash
   cd backend
2. **Install dependencies**:
   ```bash
   npm install
3. **Add an .env file and add your API token from Runn's API**:
   ```bash
   API_TOKEN=your_api_token_here
4. **Create a credentials.json file and add your Gmail API authentication info**:
      ```
         {
        "web": {
          "client_id": "your_client_id_here",
          "project_id": "your_project_id_here",
          "auth_uri": "your_auth_uri_here",
          "token_uri": "your_token_uri_here",
          "auth_provider_x509_cert_url": "your_auth_provider_x509_cert_url_here",
          "client_secret": "your_client_secret_here",
          "redirect_uris": ["your_redirect_uris_here"]
           }
         }
      ```
6. **Start the server**:
   ```bash
   npm run dev
  **Your server should now be running on server http://localhost:8000**

## Demo

You can watch a video demo of the app here: https://vimeo.com/954472361/6f01f004d7?share=copy



