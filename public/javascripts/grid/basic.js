require(['dgrid/Grid', 'dojo/domReady!'], function (Grid) {

  function getColumns(type) {
    var columns = {};
    // As an array of objects with explicit field and label properties
    columns['array'] = [
      {
        field: 'first',
        label: 'First Name'
      },
      {
        field: 'last',
        label: 'Last Name'
      },
      {
        field: 'age',
        label: 'Age'
      }
    ];

    //  As a hash map, where the key is used as the "field" and the value is an object containing a "label" property
    columns['hash1'] = {
      first: {
        label: 'First Name'
      },
      last: {
        label: 'Last Name'
      },
      age: {
        label: 'Age'
      }
    };

    // As a hash map, where the key is used as the "field" and the value is used as the "label"
    columns['hash2'] = {
      first: 'First Name',
      last: 'Last Name',
      age: 'Age'
    };

    return columns[type];
  }

  var data = [
    {first: 'Bob', last: 'Barker', age: 89},
    {first: 'Vanna', last: 'White', age: 55},
    {first: 'Pat', last: 'Sajak', age: 65}
  ];

  var grid1 = new Grid({
    columns: getColumns('array')
  }, 'grid1');

  grid1.renderArray(data);

  var grid2 = new Grid({
    columns: getColumns('hash1')
  }, 'grid2');

  grid2.renderArray(data);

  var grid3 = new Grid({
    columns: getColumns('hash2')
  }, 'grid3');
  grid3.renderArray(data);
});

/**
 * Expanding functionality with mixins and extensions
 */
require([
  'dojo/_base/declare',
  'dgrid/Grid',
  'dgrid/Keyboard',
  'dgrid/Selection',
  'dojo/domReady!'
], function (declare, Grid, Keyboard, Selection) {
  var data = [
    {first: 'Bob', last: 'Barker', age: 89},
    {first: 'Vanna', last: 'White', age: 55},
    {first: 'Pat', last: 'Sajak', age: 65}
  ];

  // Create a new constructor by mixing in the components
  var CustomGrid = declare([Grid, Keyboard, Selection]);

  // Now, create an instance of our custom grid which
  // have the features we added!
  var grid = new CustomGrid({
    columns: {
      first: 'First Name',
      last: 'Last Name',
      age: 'Age'
    },
    // for Selection; only select a single row at a time
    selectionMode: 'single',
    // for Keyboard; allow only row-level keyboard navigation
    cellNavigation: false
  }, 'grid4');
  grid.renderArray(data);

  /**
   * events
   */
    // Create a new constructor by mixing in the components
  var gridEvents = new CustomGrid({
      columns: {
        first: 'First Name',
        last: 'Last Name',
        age: 'Age'
      },
      selectionMode: 'single', // for Selection; only select a single row at a time
      cellNavigation: false // for Keyboard; allow only row-level keyboard navigation
    }, 'grid5');
  gridEvents.renderArray(data);

  gridEvents.on('dgrid-select', function (event) {
    // Report the item from the selected row to the console.
    console.log('Row selected: ', event.rows[0].data);
  });
  gridEvents.on('dgrid-deselect', function (event) {
    console.log('Row de-selected: ', event.rows[0].data);
  });
  gridEvents.on('.dgrid-row:click', function (event) {
    var row = gridEvents.row(event);
    console.log('Row clicked:', row.data);
  });
});