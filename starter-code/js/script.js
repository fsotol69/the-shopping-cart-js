let delete_Items, calculatePricesBtn, row_items, productos;

function deleteItem(e) {
  target = e.target;
  console.log(target);
}

function getPriceByProduct(itemNode) {}

function updatePriceByProduct(productPrice, index) {}

function getTotalPrice() {}

function createQuantityInput() {}

function createDeleteButton() {}

function createQuantityNode() {}

function createItemNode(dataType, itemData) {}

function createNewItemRow(itemName, itemUnitPrice) {}

function createNewItem() {}

function calculatePrices() {
  console.log('Calculando total');
}

function loadJSON(callback) {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', 'data/products.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == '200') {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      console.log(xobj.responseText);
      callback(xobj.responseText);
    }
  };
 xobj.send(null);
}

addEventListener('load', () => {
  this.delete_Items = document.getElementsByClassName('btn-delete');
  console.log(delete_Items);
  for (let item of this.delete_Items) {
    console.log(item.parentNode);
  }
  this.calculatePricesBtn = document.getElementsByClassName('btn')[0];
  this.calculatePricesBtn.addEventListener('onclick', this.calculatePrices());
  this.row_items = [];
  // LOAD Products from JSON file.
  loadJSON(response => {
    productos = JSON.parse(response);
  });
});
