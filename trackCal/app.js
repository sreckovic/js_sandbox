// Storage Ctrl
const storageCtrl = (function() {
  // Public methods
  return {
    storeItem: function(item) {
      let items;

      // Check if any items in localStorage
      if (localStorage.getItem('items') === null) {
        items = [];
        items.push(item);
        // Set localStorage
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('items'));
        items.push(item);
        // Reset localStorage
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function() {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }

      return items;
    },
    updateItemStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index) {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });

      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: function(id) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index) {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });

      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function() {
      localStorage.removeItem('items');
    }
  };
})();

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
    // items: [
    //   { id: 0, name: 'Steak Dinner', calories: 1200 },
    //   { id: 1, name: 'Cookie', calories: 400 },
    //   { id: 2, name: 'Eggs', calories: 300 }
    // ],
    items: storageCtrl.getItemsFromStorage(),
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
    deleteItem: function(id) {
      // Get ids
      const ids = state.items.map(function(item) {
        return item.id;
      });
      console.log(ids);
      // Get index
      const index = ids.indexOf(id);
      console.log(index);
      // Remove item
      state.items.splice(index, 1);
    },
    clearAllItems: function() {
      state.items = [];
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
    clearBtn: '.clear-btn',
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
    deleteListitem: function(id) {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
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
    removeItems: function() {
      let listItems = document.querySelectorAll(uiSelectors.listItems);

      // Turn Node list into array
      listItems = Array.from(listItems);
      listItems.forEach(function(item) {
        item.remove;
      });
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
const appCtrl = (function(itemCtrl, storageCtrl, uiCtrl) {
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

    // Delete button event
    document
      .querySelector(uiSelectors.deleteBtn)
      .addEventListener('click', itemDeleteSubmit);

    // Back button event
    document
      .querySelector(uiSelectors.backBtn)
      .addEventListener('click', function(e) {
        uiCtrl.clearEditState();
        e.preventDefault();
      });

    // Clear button event
    document
      .querySelector(uiSelectors.clearBtn)
      .addEventListener('click', clearAllItemsClick);
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

      // Store in localStorage
      storageCtrl.storeItem(newItem);

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

    // Update localStorage
    storageCtrl.updateItemStorage(updatedItem);

    uiCtrl.clearEditState();

    e.preventDefault();
  };

  // Delete button event
  const itemDeleteSubmit = function(e) {
    // Get current item
    const currentItem = itemCtrl.getCurrentItem();

    // Delete from state
    itemCtrl.deleteItem(currentItem.id);

    // Delete from UI
    uiCtrl.deleteListitem(currentItem.id);

    // Get total calories
    const totalCalories = itemCtrl.getTotalCalories();

    // Add total calories to UI
    uiCtrl.showTotalCalories(totalCalories);

    // Delete from localStorage
    storageCtrl.deleteItemFromStorage(currentItem.id);

    uiCtrl.clearEditState();

    e.preventDefault();
  };

  // Clear items event
  const clearAllItemsClick = function() {
    // Delete all items from state
    itemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = itemCtrl.getTotalCalories();

    // Add total calories to UI
    uiCtrl.showTotalCalories(totalCalories);

    // Remove from UI
    uiCtrl.removeItems();

    // Remove from localStorage
    storageCtrl.clearItemsFromStorage();

    // Hide UL
    uiCtrl.hideList();
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
})(itemCtrl, storageCtrl, uiCtrl);

// Init app
appCtrl.init();
