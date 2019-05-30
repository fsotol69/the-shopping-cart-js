let delete_Items, calculatePricesBtn, row_items, products;

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

addEventListener('load', () => {
  this.delete_Items = document.getElementsByClassName('btn-delete');
  console.log(delete_Items);
  for (let item of this.delete_Items) {
    console.log(item.parentNode);
  }
  //   delete_Items.forEach(element => {
  //     console.log(element.parentNode)
  //   });
  this.calculatePricesBtn = document.getElementsByClassName('btn')[0];
  this.calculatePricesBtn.addEventListener('onclick', this.calculatePrices());
  this.row_items = [];
  this.products = [];
});
