from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='.')
CORS(app)

# In-memory storage for TODO items
todos = []
next_id = 1

@app.route('/')
def index():
    """Serve the main HTML file"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files (CSS, JS)"""
    return send_from_directory('.', path)

@app.route('/todos', methods=['GET'])
def get_todos():
    """Get all TODO items"""
    return jsonify(todos)

@app.route('/todos', methods=['POST'])
def add_todo():
    """Add a new TODO item"""
    global next_id
    data = request.get_json()
    
    if not data or 'text' not in data:
        return jsonify({'error': 'TODO text is required'}), 400
    
    new_todo = {
        'id': next_id,
        'text': data['text'],
        'completed': False
    }
    
    todos.append(new_todo)
    next_id += 1
    
    return jsonify(new_todo), 201

@app.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    """Delete a TODO item by ID"""
    global todos
    todos = [todo for todo in todos if todo['id'] != todo_id]
    return jsonify({'message': 'TODO deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
