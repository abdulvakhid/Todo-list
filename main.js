// DOM elements
let elTodoForm = document.querySelector(".todo-form");
let elInput = elTodoForm.querySelector(".form-control");
let elTodoList = document.querySelector(".list");
const elDeleteList = document.querySelector(".delete-list");

// search
const elSearchForm = document.querySelector(".search-form");
const elInputSearch = document.querySelector(".input-search");

// Count elements 
const elAll = document.querySelector(".all");
const elComplete = document.querySelector(".complete");
const elUnComplete = document.querySelector(".uncomplete");
const allC = document.querySelector(".allC");
const completeC = document.querySelector(".completeC");
const unCompleteC = document.querySelector(".uncompleteC");

// Audio 
const elAudioDelete = document.querySelector("#delete-aud");
const elAudieReset = document.querySelector("#reset-aud");

// new array
let lists = JSON.parse(window.localStorage.getItem("data")) || [];


elTodoForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    let inputValue = elInput.value;

    let obj = {
        id: lists.length > 0 ? lists[lists.length - 1].id + 1 : 1,
        name: inputValue,
        isComplete: false,
    };

    if (inputValue !== "") {
        lists.push(obj);
    } else {
        alert("error");
    }

    elInput.value = "";
    window.localStorage.setItem("data", JSON.stringify(lists));
    createtodo(lists, elTodoList, "Delete");
    countArr();
});

// for (const list of lists) {

//     let newItem = document.createElement("li");
//     newItem.textContent = list.name;

//     newItem.classList.add("mt-2", "border-bottom", "p-2", "text-white", "fs-5")

//     newList.appendChild(newItem);
//     elTodoList.appendChild(newList);
// }

// search 
elSearchForm.addEventListener("keyup", function (evt) {
    let searchInputValue = elInputSearch.value.toLowerCase();
    let searchItem = lists.filter(item => {
        return item.name.toLowerCase().includes(searchInputValue);
    });
    createtodo(searchItem, elTodoList, "Delete");
});

// create todo 
function createtodo(arr, element, text) {
    element.innerHTML = "";

    arr.forEach(obj => {
        let newList = document.createElement("li");
        let newLabel = document.createElement("label");
        let newInput = document.createElement("input");
        let newSpan = document.createElement("span");
        let newText = document.createElement("p");
        let newBtn = document.createElement("button");

        newText.classList.add("text");
        newInput.classList.add("visually-hiddem", "input-checked");
        newSpan.classList.add("span-checked");
        newBtn.classList.add("delete");
        newList.classList.add("site-item", "d-flex", "justify-content-between", "mb-3", "bg-info", "bg-gradient", "rounded-4", "p-3");
        newInput.type = "checkbox";
        newBtn.textContent = text;
        newText.textContent = obj.name;

        newText.dataset.id = obj.id;
        newInput.dataset.id = obj.id;
        newBtn.dataset.id = obj.id;

        if (obj.isComplete) {
            newInput.checked = true;
            newText.style.textDecoration = "line-through";
        }

        newLabel.appendChild(newInput);
        newLabel.appendChild(newSpan);
        newList.appendChild(newLabel);
        newList.appendChild(newText);
        newList.appendChild(newBtn);
        element.appendChild(newList);
    });
}

createtodo(lists, elTodoList, "Delete");

// delete item
let deleteItem;
elTodoList.addEventListener("click", function (evt) {
    if (evt.target.matches(".delete")) {
        let btnId = Number(evt.target.dataset.id);
        let findItem = lists.findIndex(obj => obj.id === btnId);
        deleteItem = lists.filter(obj => obj.id == btnId);

        setTimeout(function () {
            createtodo(deleteItem, elDeleteList, "Reset");
            setTimeout(function () {
                elDeleteList.innerHTML = "";
            }, 5000);
        }, 0);

        lists.splice(findItem, 1);
        window.localStorage.setItem("data", JSON.stringify(lists));

        audioFn(elAudioDelete);
        createtodo(lists, elTodoList, "Delete");
        countArr();
    }
});

// checked todo item

elTodoList.addEventListener("click", function(evt){
    
    if (evt.target.matches(".input-checked")) {
    
        let inputId = Number(evt.target.dataset.id);
    
        let findItem = lists.find(obj => obj.id == inputId);
        findItem.isComplete = !findItem.isComplete;
        window.localStorage.setItem("data", JSON.stringify(lists));
        createtodo(lists, elTodoList, "Delete");
        countArr();
    }
})


// count todo lists 

function countArr() {

    elAll.textContent = lists.length;

    let finished = lists.filter(item => item.isComplete === true);
    elComplete.textContent = finished.length;

    let pendingList = lists.filter(item => item.isComplete === false);
    elUnComplete.textContent = pendingList.length;


    allC.addEventListener("click", function () {
        createtodo(lists, elTodoList, "Delete");
    });
    completeC.addEventListener("click", function () {
        createtodo(finished, elTodoList, "Delete");
    });
    unCompleteC.addEventListener("click", function () {
        createtodo(pendingList, elTodoList, "Delete");
    });
};
countArr();

// change item 
elTodoList.addEventListener("dblclick", function (evt) {
    if (evt.target.matches(".text")) {
        let valueItem = evt.target.textContent;
        let elInputValue = prompt("Enter new task", valueItem);
        let textId = Number(evt.target.dataset.id);
        let itemFind = lists.find(item => item.id === textId);

        if (elInputValue !== "") {
            itemFind.name = elInputValue;
            window.localStorage.setItem("data", JSON.stringify(lists));
            createtodo(lists, elTodoList, "Delete");
        }
    }
});



// reset item

elDeleteList.addEventListener("click", function (evt) {
    if (evt.target.matches(".delete")) {

        let resetId = evt.target.dataset.id;
        let resetItem = deleteItem.find(obj => obj.id == resetId);

        lists.push(resetItem);
        console.log(lists);

        elDeleteList.innerHTML = "";
        audioFn(elAudieReset);
        createtodo(lists, elTodoList, "Delete");
    }
});

function audioFn(element) {
    element.play();
}