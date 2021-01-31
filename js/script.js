var items = [];

window.addEventListener("DOMContentLoaded", (event) => {
  itemsPending();
});

const addItem = document.getElementById("addButton");
const canceItem = document.getElementById("canceItem");
const saveItem = document.getElementById("saveItem");
const title = document.getElementById("title");
const descreption = document.getElementById("description");
const input = document.querySelector("input");

addItem.addEventListener("click", () => {
  const section = document.getElementById("add_section");
  section.style.display = "block";
});

canceItem.addEventListener("click", () => {
  const section = document.getElementById("add_section");
  section.style.display = "none";
  title.value = "";
  descreption.value = "";
});

saveItem.addEventListener("click", () => {
  if (title.value === "" && descreption.value === "") {
    alert("please fill title and description.");
  } else if (title.value === "") {
    alert("please fill title.");
  } else if (descreption.value === "") {
    alert("please fill description.");
  } else {
    alert("Item added successfully");
    data = {
      itemTitle: title.value,
      itemDesc: descreption.value,
      status: "pending",
    };
    items.push(data);
    const section = document.getElementById("add_section");
    section.style.display = "none";
    title.value = "";
    descreption.value = "";
    // update Items list from here
    displayList();
  }
});

function displayList() {
  let strHtml = "";
  items.map((elem, index) => {
    const statusClass = elem.status === "pending" ? "danger" : "primary";
    strHtml += `<div class="alert alert-${statusClass} shadow" role="alert">
          <div class="w-75">
            <h6>${elem.itemTitle}</h6>
            <p>
              ${elem.itemDesc}
            </p>
          </div>
          <div class="w-25 text-right d-flex">`;
    const button =
      elem.status === "pending"
        ? `<button class="btn btn-sm btn-warning" onclick="changeToSuccess(${index})">Pending</button>`
        : `<button class="btn btn-sm btn-success" onclick="changeToPending(${index})">Done</button>`;
    strHtml += `<div class="status-div border-right text-center">
              <small class="font-weight-bold">Change Status</small>
              ${button}
            </div>
            <div class="action-div text-center">
              <small class="font-weight-bold">Actions</small>
              <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
            </div>
          </div>
        </div>`;
  });
  //   const number of task

  const listing = document.getElementById("listing");
  listing.innerHTML = strHtml;
  itemsPending();
}

function removeItem(index) {
  const remove = items.filter((element, indexitem) => {
    return indexitem !== index;
  });
  items = remove;
  displayList();
}

function itemsPending() {
  if (items.length > 0) {
    // let pendingLength = [];
    // const length = items.map((element) => {
    //   const pendimg = (element.status = "pending");
    //   pendingLength.push(pendimg);
    // });
    // console.log(pendingLength.length, items);
    document.getElementsByClassName(
      "top-bar"
    )[0].innerHTML = `<h6>You have ${items.length} todos left.</h6>`;
  } else {
    document.getElementsByClassName(
      "top-bar"
    )[0].innerHTML = `<h6>You have 0 todos left.</h6>`;
  }
}

function changeToSuccess(itemIndex) {
  items[itemIndex].status = "success";
  displayList();
}
function changeToPending(itemIndex) {
  items[itemIndex].status = "pending";
  displayList();
}

// sarch functionality  with external call back

function logKey() {
  const edValue = document.getElementById("edValue");
  let term = edValue.value;
  if (term.length !== 0) {
    const elems = document.getElementsByClassName("alert");
    const convertToArray = Object.values(elems);
    if (convertToArray.length !== 0) {
      convertToArray.map((e) => {
        // const getChilds = e.children[0].children[0];
        var s = e.innerText;
        if (s.indexOf(term) != -1) {
          e.className = "alert alert-danger shadow show";
        } else {
          e.className = "alert alert-danger shadow hide";
        }
      });
    }
  }
}
