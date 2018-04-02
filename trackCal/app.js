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
    logData: function() {
      return state;
    }
  };
})();

// UI Ctrl
const uiCtrl = (function() {
  const uiSelectors = {
    itemList: '#item-list'
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
    }
  };
})();

// App Ctrl
const appCtrl = (function(itemCtrl, uiCtrl) {
  // Public methods
  return {
    init: function() {
      console.log('Init app');
      // Fetch items from state
      const items = itemCtrl.getItems();

      // Populate list with items
      console.log(items);
      uiCtrl.populateItemList(items);
    }
  };
})(itemCtrl, uiCtrl);

// Init app
appCtrl.init();
