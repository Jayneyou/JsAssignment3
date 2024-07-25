document.addEventListener('DOMContentLoaded', () => {

    //---------------- page elements
    const addButton = document.querySelector('.input-area button');
    const inputField = document.querySelector('.input-area input');
    const listContainer = document.querySelector('.list');

    // --------------------------sounds
    const dingSound = new Audio('ding.mp3');
    const addSound = new Audio('add.mp3');
    const deleteSound = new Audio('delete.mp3');

    // --------------------------counter elements
    const totalItemsCounter = document.getElementById('total-items');
    const completedItemsCounter = document.getElementById('completed-items');
    const deletedItemsCounter = document.getElementById('deleted-items');
    let totalItems = 0;
    let completedItems = 0;
    let deletedItems = 0;

    // ----------------------- update counters function
    function updateCounters() {
        totalItemsCounter.textContent = totalItems;
        completedItemsCounter.textContent = completedItems;
        deletedItemsCounter.textContent = deletedItems;
    }

    // ----------------------- add item event listener
    addButton.addEventListener('click', () => {
        const todoText = inputField.value.trim();
        // --------do not add empty items
        if (todoText === '') return;

        // -----------------------delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            // -----fade out animation
            todoItem.classList.remove('fade-out-green');
            todoItem.classList.add('fade-out-red');
            // -----counter update
            deletedItems++;
            totalItems--;
            // ------remove item after animation
            todoItem.addEventListener('animationend', () => {
                todoItem.remove();
                updateCounters();
            }, { once: true });
            deleteSound.play();
        });

        // ---------------------create new to-do item
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        // --------------------create label
        const label = document.createElement('label');
        label.textContent = todoText;

        // ---------------------- create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // -------------------append items to the list
        todoItem.appendChild(checkbox);
        todoItem.appendChild(label);
        todoItem.appendChild(deleteButton);
        listContainer.appendChild(todoItem);

        // ----------clear the input field
        inputField.value = '';

        addSound.play();
        totalItems++;
        reorderTodoList();
        updateCounters();

        // --------------------checkbox event listener
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                label.style.textDecoration = 'line-through';
                todoItem.classList.add('fade-out-green');
                listContainer.appendChild(todoItem);
                dingSound.play();
                completedItems++;
            } else {
                label.style.textDecoration = 'none';
                todoItem.classList.remove('fade-out-green');
                completedItems--;
            }
            updateCounters();
            reorderTodoList();
        });
    });

    // -----------------function to reorder items
    function reorderTodoList() {
        const items = Array.from(listContainer.children);

        // Sort items: checked ones to the end
        items.sort((a, b) => {
            const aChecked = a.querySelector('input').checked;
            const bChecked = b.querySelector('input').checked;
            return aChecked - bChecked;
        });

        // Re-add items in sorted order
        items.forEach(item => listContainer.appendChild(item));
    }
});
