const form = document.querySelector('#itemForm'); 
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('.item-list');
const clearButton = document.querySelector('#clear-list');

let todoItems = [];

const handleItem = function(itemName){

    const items = itemList.querySelectorAll('.item');
 
    items.forEach(function(item){
        
        if(item.querySelector('.item-name').textContent === itemName){
            item.querySelector('.complete-item').addEventListener('click', function(){
                item.querySelector('.item-name').classList.toggle('completed');
                this.classList.toggle('visibility');
            });
        }
    })
}

const getList = function(todoItems){
    itemList.innerHTML = '';

        todoItems.forEach(function(item){
            itemList.insertAdjacentHTML('beforeend', `<div class="item my-3"><h5 class="item-name text-capitalize">${item}</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>` );

            handleItem(item);
        });
}

const getLocalStorage = function(){

    const todoStorage = localStorage.getItem('todoItems');
    if (todoStorage === 'undefined' || todoStorage === null){
        todoItems = [];
    } else {
        todoItems = JSON.parse(todoStorage);
        getList(todoItems);
    }
}

const setLocalStorage = function(todoItems){
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

getLocalStorage();

form.addEventListener('submit', function(e){ 
    e.preventDefault();
    const itemName = itemInput.value;
    
    if (itemName.length === 0){
        feedback.innerHTML = 'Please Enter Anything';
        feedback.classList.add('showItem', 'alert-danger');
        setTimeout(
            function(){
                feedback.classList.remove('showItem');
                }, 3000);
    } else {
        todoItems.push(itemName);
        setLocalStorage(todoItems);
        getList(todoItems);
    }
    
    itemInput.value = '';

    });

clearButton.addEventListener('click', function(){
    todoItems = [];
    localStorage.clear();
    getList(todoItems);
})