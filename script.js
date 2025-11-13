// Backend API URL
const API_URL = 'http://localhost:5000';

// DOM elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyMessage = document.getElementById('emptyMessage');

// Load all TODOs when page loads
document.addEventListener('DOMContentLoaded', loadTodos);

// Add TODO when button is clicked
addBtn.addEventListener('click', addTodo);

// Add TODO when Enter key is pressed
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

/**
 * Fetch and display all TODO items from the backend
 */
async function loadTodos() {
    try {
        const response = await fetch(`${API_URL}/todos`);
        const todos = await response.json();
        
        displayTodos(todos);
    } catch (error) {
        console.error('Error loading TODOs:', error);
        alert('Failed to load TODOs. Make sure the backend server is running.');
    }
}

/**
 * Display TODO items in the UI
 */
function displayTodos(todos) {
    // Clear current list
    todoList.innerHTML = '';
    
    // Show/hide empty message
    if (todos.length === 0) {
        emptyMessage.classList.add('show');
    } else {
        emptyMessage.classList.remove('show');
    }
    
    // Create list items for each TODO
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTodo(todo.id);
        
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

/**
 * Add a new TODO item
 */
async function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        alert('Please enter a TODO item');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
        
        if (response.ok) {
            // Clear input field
            todoInput.value = '';
            
            // Reload the TODO list
            loadTodos();
        } else {
            alert('Failed to add TODO');
        }
    } catch (error) {
        console.error('Error adding TODO:', error);
        alert('Failed to add TODO. Make sure the backend server is running.');
    }
}

/**
 * Delete a TODO item by ID
 */
async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            // Reload the TODO list
            loadTodos();
        } else {
            alert('Failed to delete TODO');
        }
    } catch (error) {
        console.error('Error deleting TODO:', error);
        alert('Failed to delete TODO. Make sure the backend server is running.');
    }
}
