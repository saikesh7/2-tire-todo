# TODO Web Application

A simple two-tier TODO application with a Python Flask backend and HTML/CSS/JavaScript frontend.

## Project Structure

```
todo-app/
├── backend/
│   ├── app.py              # Flask backend server
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── index.html          # Main HTML page
│   ├── style.css           # Styling
│   └── script.js           # Frontend JavaScript logic
└── README.md               # This file
```

## Features

- Add new TODO items
- View all TODO items
- Delete TODO items
- Real-time updates without page reload
- Clean and modern UI

## Setup Instructions

### Step 1: Install Python

Make sure you have Python 3.7 or higher installed on your system.
Check by running:
```
python --version
```

### Step 2: Set Up Backend

1. Navigate to the backend directory:
```
cd backend
```

2. Install Flask and dependencies:
```
pip install -r requirements.txt
```

3. Run the Flask server:
```
python app.py
```

The backend server will start on `http://localhost:5000`

### Step 3: Open Frontend

1. Open a new terminal/command prompt

2. Navigate to the frontend directory:
```
cd frontend
```

3. Open `index.html` in your web browser:
   - **Option 1**: Double-click the `index.html` file
   - **Option 2**: Right-click and select "Open with" → your browser
   - **Option 3**: Use a simple HTTP server (recommended):
     ```
     python -m http.server 8000
     ```
     Then open `http://localhost:8000` in your browser

### Step 4: Use the Application

1. Make sure the backend server is running (Step 2)
2. Open the frontend in your browser (Step 3)
3. Start adding, viewing, and deleting TODOs!

## API Endpoints

- `GET /todos` - Get all TODO items
- `POST /todos` - Add a new TODO item (requires JSON body with `text` field)
- `DELETE /todos/<id>` - Delete a TODO item by ID

## Technologies Used

### Backend
- Python 3
- Flask (web framework)
- Flask-CORS (enable cross-origin requests)

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests

## Notes

- TODO items are stored in memory (Python list), so they will be lost when the server restarts
- CORS is enabled to allow the frontend to communicate with the backend
- The application runs entirely on localhost
