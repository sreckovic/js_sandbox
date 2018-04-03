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
      { id: 0, name: 'Steak Dinner', calories: 1200 },
      { id: 1, name: 'Cookie', calories: 400 },
      { id: 2, name: 'Eggs', calories: 300 }
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
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
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
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    // Get from input from UI Ctrl
    const input = uiCtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = itemCtrl.addItem(input.name, input.calories);
    }
    e.preventDefault();
  };
  // Public methods
  return {
    init: function() {
      console.log('Init app');
      // Fetch items from state
      const items = itemCtrl.getItems();

      // Populate list with items
      console.log(items);
      uiCtrl.populateItemList(items);

      // Load event listeners
      loadEventListeners();
    }
  };
})(itemCtrl, uiCtrl);

// Init app
appCtrl.init();
