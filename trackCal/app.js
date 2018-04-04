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
    setCurrentItem: function(item) {
      state.currentItem = item;
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
    clearInput: function() {
      document.querySelector(uiSelectors.itemNameInput).value = '';
      document.querySelector(uiSelectors.itemCaloriesInput).value = '';
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

    // Edit icon click event
    document
      .querySelector(uiSelectors.itemList)
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

  // Update item submit
  const itemUpdateSubmit = function(e) {
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
