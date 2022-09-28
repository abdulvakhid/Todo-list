let elTodoForm = document.querySelector(".todo-form");
let elInput = elTodoForm.querySelector(".form-control");
let elTodoList = document.querySelector(".box");

let newList = document.createElement("ol");
let lists = [];


elTodoForm.addEventListener("submit", function(evt){
    
    evt.preventDefault();
    
    let inputValue = elInput.value;

    if(inputValue !== ""){
        // lists.push(obj);
    }else{
    alert("error");
    }
    
    let obj = {
        id:lists.length+1,
        name:inputValue,
    }

    lists.push(obj);
    
    elInput.value =""
    newList.innerHTML = ""

    for (const list of lists) {

        let newItem = document.createElement("li");
        newItem.textContent = list.name;

        newItem.classList.add("mt-2", "border-bottom", "p-2", "text-white", "fs-5")
        
        newList.appendChild(newItem);
        elTodoList.appendChild(newList);
    }
    
})
