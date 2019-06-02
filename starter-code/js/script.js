let row_items;

function getPriceByProduct(itemNode) {}

function updatePriceByProduct(productPrice, index) {}

function getTotalPrice() {
  hideNewItemCreation();
  //console.log('Obteniendo importe total compra...');
  let subtotales = document.getElementsByClassName('subtotal-price');
  //console.log(subtotales);
  let totalAmount = 0.0;
  for (let i = 0; i < subtotales.length; i++) {
    let subTotal = parseFloat(subtotales[i].innerText.replace('€', ''));
    totalAmount += subTotal;
  }
  document.getElementById('total-amount').innerHTML =
    totalAmount.toFixed(2) + '€';
}

function hideNewItemCreation() {
  document.getElementById('new-item').style.visibility = 'hidden';
  document.getElementById('add-item').style.visibility = 'visible';
}
function showNewItemCreation() {
  document.getElementById('new-item').style.visibility = 'visible';
  document.getElementById('add-item').style.visibility = 'hidden';
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
  let product = searchProduct(productName);
  let qty = e.target.parentNode.childNodes[2].value;
  let amount = product.price * qty;
  e.target.parentNode.childNodes[3].innerText = amount.toFixed(2) + '€';
}

function deleteItem(e) {
  let itemContainerId = e.target.parentNode.id;
  if (itemContainerId !== undefined && row_items.includes(itemContainerId)) {
    let domElement = document.getElementById(itemContainerId);
    domElement.parentNode.removeChild(domElement);
    let index = row_items.indexOf(itemContainerId);
    row_items.splice(index, 1);
  }
}

function createDeleteButton() {
  // Create-Item Button
  let button = document.createElement('button');
  button.className = 'btn btn-delete';
  button.innerHTML = 'Delete';
  button.onclick = deleteItem;
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
  let newItemName = dataType.name;
  if (!row_items.includes(newItemName)) {
    let newItemRow = createNewItemRow(dataType.name, dataType.price);
    let qtyItem = createQuantityInput();
    console.log(qtyItem);
    newItemRow.appendChild(qtyItem);
    let amountItem = createItemAmount();
    newItemRow.appendChild(amountItem);
    let deleteButton = createDeleteButton();
    newItemRow.appendChild(deleteButton);
    let element = document.getElementById('new-item');
    element.parentNode.insertBefore(newItemRow, element);
    row_items.push(newItemName);
  } else {
    alert('Este producto ya existe en la lista!');
  }
}

function createNewItemRow(itemName, itemUnitPrice) {
  //<div class="item">
  let itemContainer = document.createElement('div');
  itemContainer.className = 'item';
  itemContainer.id = itemName;
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
  itemContainer.className = 'item';
  itemContainer.id = 'new-item';
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
    let dataType = searchProduct(itemName);
    if (dataType !== undefined) {
      createItemNode(dataType);
    } else {
      alert('Debes elegir un producto de la lista!');
    }
  };

  itemContainer.appendChild(button);
  return itemContainer;
}
function updateSelectedItemPrice(e) {
  let itemName = e.target.value;
  products.forEach(product => {
    if (product.name === itemName)
      e.target.nextSibling.childNodes[0].innerHTML = product.price + '€';
  });
}
function searchProduct(productName) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].name === productName) return products[i];
  }
}

addEventListener('load', () => {
  row_items = [];
  // let menu = document.getElementById('menu');
  loadStocks();
});

function createItemsSelector() {
  let selector = document.createElement('select');
  selector.value = 'Select item';
  selector.className = 'name';
  let options = [];
  for (let i = 0; i < products.length; i++) {
    let item = products[i];
    options.push(item.name);
  }

  let default_opt = document.createElement('option');
  default_opt.text = 'Choose product';
  default_opt.selected = true;
  default_opt.disabled = true;
  default_opt.hidden = true;
  selector.add(default_opt);

  for (let i = 0; i < options.length; i++) {
    let opt = options[i];
    let option = document.createElement('option');
    option.text = opt;
    selector.add(option);
  }
  return selector;
}

function loadStocks() {
  let container = document.getElementsByTagName('main')[0];
  container.innerHTML = '';
  // Main section title
  let shopTitle = document.createElement('h1');
  shopTitle.innerHTML = 'Inventory management';
  container.appendChild(shopTitle);
  // Items
  let items = document.createElement('div');
  items.className = 'items';
  // Creational new item
  let newItem = createNewItem();
  items.appendChild(newItem);
  container.appendChild(items);
  // Buttons
  let buttons = document.createElement('div');
  buttons.className = 'buttons';
  // Buton totalPrice
  let totalPriceButton = document.createElement('button');
  totalPriceButton.className = 'btn';
  totalPriceButton.onclick = getTotalPrice;
  totalPriceButton.innerHTML = 'Calculate prices';
  buttons.appendChild(totalPriceButton);
  // Button AddItem
  let addItemButton = document.createElement('button');
  addItemButton.className = 'btn';
  addItemButton.id = 'add-item';
  addItemButton.onclick = showNewItemCreation;
  addItemButton.innerHTML = 'Add Item';
  buttons.appendChild(addItemButton);
  container.appendChild(buttons);
  // Total price
  let divTotalPrice = document.createElement('div');
  divTotalPrice.className = 'total-price';
  let totalPriceTitle = document.createElement('h2');
  totalPriceTitle.innerHTML = 'Total Price: <span id="total-amount">0€</span>';
  divTotalPrice.appendChild(totalPriceTitle);
  container.appendChild(divTotalPrice);
}
