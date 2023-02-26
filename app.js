const key =
  "https://crudcrud.com/api/57b8461deab84d49abab1a035e302e23/products";

const ul = document.getElementById("items");
function getDetails() {
  var value = 0;
  axios
    .get(key)
    .then((res) => {
      let arr = res.data;
      arr.forEach((element) => {
        createli(element.product_name, element.product_price);
        value += Number(element.product_price);
      });
    })
    .then(() => {
      document.getElementById(
        "sum"
      ).textContent = `Total Value Worth of Produts : ${value}`;
    });
}

window.addEventListener("DOMContentLoaded", () => {
  getDetails();
});

//create new li with delete button
function createli(name, price) {
  const deleteBtn = document.createElement("input");
  deleteBtn.setAttribute("type", "button");
  deleteBtn.setAttribute("onclick", "deleteBtnFn(event)");
  deleteBtn.value = "Delete Item";
  deleteBtn.className = "delete";

  //create li element
  const liElement = document.createElement("li");
  liElement.className = "item";
  liElement.textContent = `${name}-${price}`;
  liElement.appendChild(deleteBtn);
  ul.appendChild(liElement);
}

function addProduct(event) {
  event.preventDefault();
  const price = document.getElementById("price").value;
  const name = document.getElementById("name").value;

  const obj = {
    product_name: name,
    product_price: price,
  };

  axios
    .post(key, obj)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  location.reload();
}

function deleteBtnFn(event) {
  event.target.parentNode.style.display = "none";
  const name = event.target.parentNode.textContent.split("-")[0];
  const price = event.target.parentNode.textContent.split("-")[1];

  const product_id = axios.get(key).then((items) => {
    let arr = items.data;
    let id;
    let value = 0,
      itemToRemove;
    arr.forEach((element) => {
      if (name == element.product_name && price == element.product_price) {
        id = element._id;
        itemToRemove = element.product_price;
      }
      value += Number(element.product_price);
    });

    return [id, value, itemToRemove];
  });
  product_id.then((res) => {
    axios.delete(`${key}/${res[0]}`);
    document.getElementById(
      "sum"
    ).textContent = `Total Value Worth of Produts : ${
      Number(res[1]) - Number(res[2])
    }`;
  });
}
