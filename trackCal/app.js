// Storage Ctrl

// Item Ctrl
const itemCtrl = (function() {
  // Item Constructor
  const item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const state = {
    items: [
      // { id: 0, name: 'Steak Dinner', calories: 1200 },
      // { id: 1, name: 'Cookie', calories: 400 },
      // { id: 2, name: 'Eggs', calories: 300 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  return {
    getItems: function() {
      return state.items;
    },
    addItem: function(name, calories) {
      let id;
      // Create ID
      if (state.items.length > 0) {
        id = state.items[state.items.length - 1].id + 1;
      } else {
        id = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new item(id, name, calories);
      state.items.push(newItem);
      return newItem;
    },
    getItemById: function(id) {
      let found = null;
      state.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });

      return found;
    },
    updateItem: function(name, calories) {
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      state.items.forEach(function(item) {
        if (item.id === state.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    setCurrentItem: function(item) {
      state.currentItem = item;
    },
    getCurrentItem: function() {
      return state.currentItem;
    },
    getTotalCalories: function() {
      let total = 0;
      state.items.forEach(function(item) {
        total += item.calories;
      });

      // Set total cal in state structure
      state.totalCalories = total;
      return state.totalCalories;
    },
    logData: function() {
      return state;
    }
  };
})();

// UI Ctrl
const uiCtrl = (function() {
  const uiSelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  };
  return {
    populateItemList: function(items) {
      let html = '';
      items.forEach(function(item) {
        html += `
          <li id="item-${item.id}" class="collection-item">
            <strong>${item.name}:</strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil-alt"></i>
            </a>
          </li>
        `;
        document.querySelector(uiSelectors.itemList).innerHTML = html;
      });
    },
    getItemInput: function() {
      return {
        name: document.querySelector(uiSelectors.itemNameInput).value,
        calories: document.querySelector(uiSelectors.itemCaloriesInput).value
      };
    },
    addListItem: function(item) {
      // Show the list
      document.querySelector(uiSelectors.itemList).style.display = 'block';

      // Create li element
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `
        <strong>${item.name}:</strong>
        <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil-alt"></i>
        </a>
      `;

      document
        .querySelector(uiSelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(uiSelectors.listItems);

      // Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(listItem) {
        const itemId = listItem.getAttribute('id');

        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `
            <strong>${item.name}:</strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil-alt"></i>
            </a>
          `;
        }
      });
    },
    clearInput: function() {
      document.querySelector(uiSelectors.itemNameInput).value = '';
      document.querySelector(uiSelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function() {
      document.querySelector(
        uiSelectors.itemNameInput
      ).value = itemCtrl.getCurrentItem().name;
      document.querySelector(
        uiSelectors.itemCaloriesInput
      ).value = itemCtrl.getCurrentItem().calories;
      uiCtrl.showEditState();
    },
    hideList: function() {
      document.querySelector(uiSelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(
        uiSelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: function() {
      uiCtrl.clearInput();
      document.querySelector(uiSelectors.updateBtn).style.display = 'none';
      document.querySelector(uiSelectors.deleteBtn).style.display = 'none';
      document.querySelector(uiSelectors.backBtn).style.display = 'none';
      document.querySelector(uiSelectors.addBtn).style.display = 'inline';
    },
    showEditState: function() {
      document.querySelector(uiSelectors.updateBtn).style.display = 'inline';
      document.querySelector(uiSelectors.deleteBtn).style.display = 'inline';
      document.querySelector(uiSelectors.backBtn).style.display = 'inline';
      document.querySelector(uiSelectors.addBtn).style.display = 'none';
    },
    getSelectors: function() {
      return uiSelectors;
    }
  };
})();

// App Ctrl
const appCtrl = (function(itemCtrl, uiCtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI Selectors
    const uiSelectors = uiCtrl.getSelectors();

    // Add item event
    document
      .querySelector(uiSelectors.addBtn)
      .addEventListener('click', itemAddSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
    // Edit icon click event
    document
      .querySelector(uiSelectors.itemList)
      .addEventListener('click', itemEditClick);

    // Update item event
    document
      .querySelector(uiSelectors.updateBtn)
      .addEventListener('click', itemUpdateSubmit);
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    // Get from input from UI Ctrl
    const input = uiCtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = itemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      uiCtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = itemCtrl.getTotalCalories();

      // Add total calories to UI
      uiCtrl.showTotalCalories(totalCalories);

      // Clear fields
      uiCtrl.clearInput();
    }
    e.preventDefault();
  };

  // Click edit item
  const itemEditClick = function(e) {
    if (e.target.classList.contains('edit-item')) {
      // Get list item id
      const listId = e.target.parentNode.parentNode.id;
      // Break into an array
      const listIdArr = listId.split('-');
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = itemCtrl.getItemById(id);

      // Set current item
      itemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      uiCtrl.addItemToForm();
    }
    e.preventDefault();
  };

  // Item update submit
  const itemUpdateSubmit = function(e) {
    // Get item input
    const input = uiCtrl.getItemInput();
    // Updated item
    const updatedItem = itemCtrl.updateItem(input.name, input.calories);

    // Update UI
    uiCtrl.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = itemCtrl.getTotalCalories();

    // Add total calories to UI
    uiCtrl.showTotalCalories(totalCalories);

    uiCtrl.clearEditState();

    e.preventDefault();
  };

  // Public methods
  return {
    init: function() {
      // Clear edit state / set init state of ui
      uiCtrl.clearEditState();

      // Fetch items from state
      const items = itemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        uiCtrl.hideList();
      } else {
        // Populate list with items
        uiCtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = itemCtrl.getTotalCalories();

      // Add total calories to UI
      uiCtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  };
})(itemCtrl, uiCtrl);

// Init app
appCtrl.init();
