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
    logData: function() {
      return state;
    }
  };
})();

// UI Ctrl
const uiCtrl = (function() {
  return {};
})();

// App Ctrl
const appCtrl = (function(itemCtrl, uiCtrl) {
  // Public methods
  return {
    init: function() {
      console.log('Init app');
    }
  };
})(itemCtrl, uiCtrl);

// Init app
appCtrl.init();
