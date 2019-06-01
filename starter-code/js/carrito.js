let delete_Items, calculatePricesBtn, row_items /*, products*/;

function deleteItem(e) {
  target = e.target;
  console.log(target);
}

function getPriceByProduct(itemNode) {}

function updatePriceByProduct(productPrice, index) {}

function getTotalPrice() {
  console.log('Obteniendo importe total compra...');
  let subtotales = document.getElementsByClassName('subtotal-price');
  console.log(subtotales);
  let totalAmount = 0.0;
  for (let i = 0; i < subtotales.length; i++) {
    let subTotal = parseFloat(subtotales[i].innerText.replace('€', ''));
    totalAmount += subTotal;
  }
  document.getElementById('total-amount').innerHTML =
    totalAmount.toFixed(2) + '€';
  //console.log(total_Amount);
  //for(let subtotal in subtotales) console.log(subtotal.innerText);
  //console.log(document.getElementsByClassName('subtotal-price').innerText);
}

function createQuantityInput() {
  let itemInput = document.createElement('input');
  itemInput.className = 'qty';
  itemInput.type = 'text';
  itemInput.value = 0;
  itemInput.onchange = updateItemRowAmount;
  return itemInput;
}

function createItemAmount() {
  let itemAmount = document.createElement('div');
  itemAmount.className = 'subtotal-price';
  let spanAmount = document.createElement('span');
  spanAmount.innerHTML = '0€';
  itemAmount.appendChild(spanAmount);
  return itemAmount;
}

function updateItemRowAmount(e) {
  let productName = e.target.parentNode.childNodes[0].innerText;
  console.log(e.target.parentNode.childNodes);
  let product = searchProduct(productName);
  let qty = e.target.parentNode.childNodes[2].value;
  let amount = product.price * qty;
  console.log('Item Price : ' + product.price);
  console.log('Item Quantity : ' + qty);
  console.log('Total Item Amount : ' + amount);
  console.log(product);
  console.log(e.target.parentNode.parentNode);
  e.target.parentNode.childNodes[3].innerText = amount.toFixed(2) + '€';
}

function createDeleteButton() {
  // Create-Item Button
  let button = document.createElement('button');
  button.className = 'btn btn-delete';
  button.innerHTML = 'Delete';
  button.onclick = e => {
    let itemName = e.target.parentNode.childNodes[0].value;
    console.log(e.target.parentNode.childNodes[0].value);
    let dataType = searchProduct(itemName);
    console.log(dataType);
  };
  return button;
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

function createItemNode(dataType) {
  let newItemRow = createNewItemRow(dataType.name, dataType.price);
  let qtyItem = createQuantityInput();
  console.log(qtyItem);
  newItemRow.appendChild(qtyItem);
  let amountItem = createItemAmount();
  newItemRow.appendChild(amountItem);
  let deleteButton = createDeleteButton();
  newItemRow.appendChild(deleteButton);
  //console.log(document.getElementsByClassName('items'));
  document.getElementsByClassName('items')[0].appendChild(newItemRow);
}

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

function newItemRowExists() {
  return document.getElementsByClassName('new-item').length > 0;
}

function createNewItem() {
  //<div class="new-item">
  let itemContainer = document.createElement('div');
  itemContainer.className = 'item new-item';
  //items selector
  let selector = createItemsSelector();
  selector.onchange = updateSelectedItemPrice;
  itemContainer.appendChild(selector);
  //<div class="unit-price"><span>1€</span></div>
  let itemPrice = document.createElement('div');
  itemPrice.className = 'unit-price';
  let spanPrice = document.createElement('span');
  spanPrice.innerHTML = '0€';
  itemPrice.appendChild(spanPrice);
  itemContainer.appendChild(itemPrice);
  // Create-Item Button
  let button = document.createElement('button');
  button.className = 'btn create';
  button.innerHTML = 'Create';
  button.onclick = e => {
    let itemName = e.target.parentNode.childNodes[0].value;
    console.log(e.target.parentNode.childNodes[0].value);
    let dataType = searchProduct(itemName);
    console.log(dataType);
    createItemNode(dataType);
    //console.log(e.target.parentNode.childNodes[1].childNodes[0].innerHTML);
  };
  // button.addEventListener("clik", function(){
  //   console.log("Nuevo Item con listener");
  //   console.log("Datos del padre : " + itemContainer);
  // });
  itemContainer.appendChild(button);
  return itemContainer;
}
function updateSelectedItemPrice(e) {
  let itemName = e.target.value;
  products.forEach(product => {
    if (product.name === itemName)
      e.target.nextSibling.childNodes[0].innerHTML = product.price + '€';
  });
  console.log('Datos elemento : ' + e.target.className);
  console.log('Seleccion : ' + e.target.value);
  console.log('Seleccion : ' + e.target.nextSibling.innerHTML);
  console.log('Seleccion : ' + e.target.nextSibling.childNodes[0].innerHTML);
}
function searchProduct(productName) {
  console.log(productName);
  for (let i = 0; i < products.length; i++) {
    if (products[i].name === productName) return products[i];
  }
}

function infoEventTesting(e) {
  console.log('Nuevo Item con listener');
  console.log('Datos elemento : ' + e.target.className);
  console.log('Datos padre : ' + e.target.parentNode.className);
}

function calculatePrices() {
  console.log('Calculando total');
}

/*
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
*/

addEventListener('load', () => {
  let itemsContainer = document.getElementsByClassName('items');
  // this.calculatePricesBtn = document.getElementsByClassName('btn')[0];
  // this.calculatePricesBtn.addEventListener('onclick', this.calculatePrices());
  row_items = [];
  //products = [];
  // LOAD Products from JSON file.
  /*
  loadJSON(response => {
    let json_products = JSON.parse(response);
    json_products.forEach(element => {
      products.push(element);
    });
    //console.log(products);
  });
  */
  console.log(products);
  let newItem = createNewItem();
  itemsContainer[0].appendChild(newItem);
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
  //selector.value = 'Select item';
  selector.className = 'name';
  console.log(products.length);
  let options = [];
  for (let i = 0; i < products.length; i++) {
    let item = products[i];
    console.log(item.name);
    options.push(item.name);
  }

  for (let i = 0; i < options.length; i++) {
    let opt = options[i];
    let option = document.createElement('option');
    option.text = opt;
    selector.add(option);
  }
  return selector;
}
