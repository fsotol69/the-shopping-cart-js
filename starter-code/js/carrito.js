let delete_Items, calculatePricesBtn, row_items, products;

class item {
  constructor(data, units) {
    this.jsonData = data;
    this.units = units;
    this.price = this.jsonData.price;
    this.amount = this.price * this.units;
  }
  getName() {
    return this.jsonData.name;
  }
  getUnits() {
    return this.units;
  }
  addUnit() {
    if (this.units + 1 <= this.jsonData.quantity) {
      this.units++;
      this.amount = this.price * this.units;
    }
  }
  setUnits(units) {
    if (units <= this.jsonData.quantity) {
      this.units = units;
      this.amount = this.price * this.units;
    }
  }
  getAmount() {
    return this.amount;
  }
  getPrice() {
    return this.price;
  }
  getData() {
    return this.jsonData;
  }
  getRender() {
    return renderItem(this);
  }
}

function deleteItem(e) {
  target = e.target;
  console.log(target);
}

function getPriceByProduct(itemNode) {}

function updatePriceByProduct(productPrice, index) {}

function getTotalPrice() {}

function createQuantityInput() {
  let itemInput = document.createElement('input');
  itemInput.type = 'text';
  itemInput.value = 0;
  return itemInput;
}

function createDeleteButton() {
  let deleteButton = document.createElement('div');
  deleteButton.className = 'btn-delete';
  return deleteButton;
}

function createQuantityNode() {
  let itemQTY = document.createElement('div');
  itemQTY.className = 'qty';
  let itemLabel = document.createElement('label');
  let itemInput = createQuantityInput();
  itemQTY.appendChild(itemLabel);
  itemQTY.appendChild(itemInput);
  return itemQTY;
}

function createItemNode(dataType, itemData) {}

function createNewItemRow(itemName, itemUnitPrice) {
  //<div class="item">
  let itemContainer = document.createElement('div');
  itemContainer.className = 'item';
  //<div class="name"><span>name</span></div>
  let item_Name = document.createElement('div');
  item_Name.className = 'name';
  let spanName = document.createElement('span');
  spanName.innerHTML = itemName;
  item_Name.appendChild(spanName);
  itemContainer.appendChild(item_Name);
  //<div class="unit-price"><span>1€</span></div>
  let itemPrice = document.createElement('div');
  itemPrice.className = 'unit-price';
  let spanPrice = document.createElement('span');
  spanPrice.innerHTML = itemUnitPrice + '€';
  itemPrice.appendChild(spanPrice);
  itemContainer.appendChild(itemPrice);
  return itemContainer;
}

function createNewItem() {
  //<div class="new-item">
  let itemContainer = document.createElement('div');
  itemContainer.className = 'new-item';
  //items selector
  let selector = createItemsSelector();
  itemContainer.appendChild(selector);
  //<div class="unit-price"><span>1€</span></div>
  let itemPrice = document.createElement('div');
  itemPrice.className = 'unit-price';
  let spanPrice = document.createElement('span');
  spanPrice.innerHTML = itemUnitPrice + '€';
  itemPrice.appendChild(spanPrice);
  itemContainer.appendChild(itemPrice);
  return itemContainer;
}

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
    products = JSON.parse(response);
  });
});

function renderItem(item) {
  //<div class="item">
  let itemContainer = document.createElement('div');
  itemContainer.className = 'item';
  itemContainer.id = item._id;
  //<div class="name"><span>name</span></div>
  let itemName = document.createElement('div');
  itemName.className = 'name';
  let spanName = document.createElement('span');
  spanName.innerHTML = item.getName;
  itemName.appendChild(spanName);
  itemContainer.appendChild(itemName);
  //<div class="unit-price"><span>1€</span></div>
  let itemPrice = document.createElement('div');
  itemPrice.className = 'unit-price';
  let spanPrice = document.createElement('span');
  spanPrice.innerHTML = item.getPrice + '€';
  itemPrice.appendChild(spanPrice);
  itemContainer.appendChild(itemPrice);
  //<div class="qty">
  //  <label for=""></label>
  //  <input class="quantity" type="text" value="0" />
  //</div>
  let itemQTY = document.createElement('div');
  itemQTY.className = 'qty';
  let itemLabel = document.createElement('label');
  let itemInput = document.createElement('input');
  itemInput.type = 'text';
  itemInput.value = item.getUnits;
  itemQTY.appendChild(itemLabel);
  itemQTY.appendChild(itemInput);
  item.itemContainer.appendChild(itemQTY);
  //<div class="subtotal-price"><span>1</span></div>
  let itemAmount = document.createElement('div');
  itemAmount.className = 'subtotal-price';
  let spanAmount = document.createElement('span');
  spanAmount.innerHTML = getAmount + '€';
  itemAmount.appendChild(spanAmount);
  itemContainer.appendChild(itemAmount);
  //<div class="btn-delete">Delete</div>
  let deleteButton = document.createElement('div');
  deleteButton.className = 'btn-delete';
  itemContainer.appendChild(deleteButton);
  return itemContainer;
}

function createItemsSelector() {
  let selector = document.createElement('select');
  selector.value = 'Select item';
  let options = [];
  for(let item in products){
    options.push(item.name);
  }
  for (let i = 0; i < options.length; i++) {
    let opt = options[i];
    let el = document.createElement('option');
    el.textContent = opt;
    el.value = opt;
    selector.appendChild(el);
  }
  return selector;
}
