// Get references to DOM elements
var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');
var errorMessage = document.getElementById('error-message');

// Form submit event
form.addEventListener('submit', addItem);

// Delete event
itemList.addEventListener('click', removeItem);

// Filter event
filter.addEventListener('keyup', filterItems);

// Add item function
function addItem(e) {
    e.preventDefault();

    // Get input value and trim whitespace
    var newItem = document.getElementById('item').value.trim();

    // Check if the input value is empty
    if (newItem === '') {
        errorMessage.textContent = 'Please enter an item before submitting.';
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 3000); // Clear the error message after 3 seconds
        return; // Do nothing if the input is empty
    }

    // Create new li element
    var li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    // Add text node with input value
    li.appendChild(document.createTextNode(newItem));

    // Create delete button element
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-end delete';
    deleteBtn.appendChild(document.createTextNode('X'));

    // Append button to li
    li.appendChild(deleteBtn);

    // Append li to itemList
    itemList.appendChild(li);

    // Clear the input field
    document.getElementById('item').value = '';
}

// Remove item function
function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            var li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}

// Filter items function
function filterItems(e) {
    // Convert text to lowercase
    var text = e.target.value.toLowerCase();

    // Get all list items
    var items = itemList.getElementsByTagName('li');

    // Convert HTMLCollection to array for easier manipulation
    Array.from(items).forEach(function(item) {
        // Get the text content of the item and convert it to lowercase
        var itemName = item.firstChild.textContent.toLowerCase();
        
        // Check if the item name includes the search text
        if (itemName.includes(text)) {
            item.style.display = 'flex'; // Show item
        } else {
            item.style.display = 'none'; // Hide item
        }
    });
}
