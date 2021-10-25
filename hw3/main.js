let ROOT = document.getElementById("root");
let to_do = new Array(0);
let to_do_elem = new Array(0);
let to_do_text = new Array(0);
let to_do_check = new Array(0);
let to_do_del = new Array(0);
let check_input = new Array(0);
let check_label = new Array(0);
let complete_bool = new Array(0);
var undo_num = 0;
var section, input, list, footer, total, buttons, clean, button;
var current_mode = 1;
var buffer1, buffer2;


initial();

function initial(){
    add_section();
}

function add_section(){
    section = document.createElement('section');
    section.classList.add("todo-app__main");
    ROOT.appendChild(section);
    add_input();
}

function add_input(){
    input = document.createElement('input');
    input.classList.add("todo-app__input");
    input.placeholder = "What needs to be done?";
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13){
            add_to_do();
            input.value = '';
        }
    });
    section.appendChild(input);
}

function add_to_do(){
    if(to_do.length == 0){
        create_feature();
    }
    to_do.push(input.value);
    complete_bool.push("0");
    undo_num +=1;
    display();
}

function display_ALL(){
    list.innerHTML = '';
    for(let idx = 0; idx < to_do.length; idx++){
        add_to_do_element(idx);
        if(complete_bool[idx] == 1){
            check_input[idx].checked = 1;
            to_do_text[idx].style = "text-decoration: line-through; opacity: 0.5";
        }
    }

    total.innerHTML = undo_num + ' left';
}

function display_Active(){
    list.innerHTML = '';
    for(let idx = 0; idx < to_do.length; idx++){
        if(complete_bool[idx] == 0)
            add_to_do_element(idx);
    }
    total.innerHTML = undo_num + ' left';
}

function display_Completed(){
    list.innerHTML = '';
    for(let idx = 0; idx < to_do.length; idx++){
        if(complete_bool[idx] == 1)
            add_to_do_element(idx);
            check_input[idx].checked = 1; 
            to_do_text[idx].style = "text-decoration: line-through; opacity: 0.5";
    }
    total.innerHTML = undo_num + ' left';
}


function create_feature(){
    list = document.createElement('ul');
    list.classList.add("todo-app__list");
    section.appendChild(list);

    footer = document.createElement('footer');
    footer.classList.add("todo-app__footer");
    footer.id = "todo-footer";
    ROOT.appendChild(footer);

    total = document.createElement('div');
    total.classList.add("todo-app__total");
    footer.appendChild(total);

    buttons = document.createElement('ul');
    buttons.classList.add("todo-app__view-buttons");
    footer.appendChild(buttons);

    view_buttons1 = document.createElement('button');
    view_buttons1.innerHTML = 'All';
    view_buttons1.onclick = function(){
            current_mode = 1;
            display();
    };
    buttons.appendChild(view_buttons1);

    view_buttons2 = document.createElement('button');
    view_buttons2.innerHTML = 'Active';
    view_buttons2.onclick = function(){
            current_mode = 2;
            display();
    };
    buttons.appendChild(view_buttons2);

    view_buttons3 = document.createElement('button');
    view_buttons3.innerHTML = 'Completed';
    view_buttons3.onclick = function(){
            current_mode = 3;
            display();

    };
    buttons.appendChild(view_buttons3);

    clean = document.createElement('div');
    clean.classList.add("todo-app__clean");
    clean.onclick = function(){
        clear_complete();
    };
    footer.appendChild(clean);


}

function add_to_do_element(idx){
    to_do_elem[idx] = document.createElement('li');
    to_do_elem[idx].classList.add("todo-app__item");
    to_do_elem[idx].id = "todo-list";
    list.appendChild(to_do_elem[idx]);

    to_do_check[idx] = document.createElement('div');
    to_do_check[idx].classList.add("todo-app__checkbox");
    to_do_elem[idx].appendChild(to_do_check[idx]);
    
    check_input[idx] = document.createElement('input');
    check_input[idx].type = 'checkbox';
    check_input[idx].id = idx;
    check_input[idx].onclick = function(){
        if(complete_bool[idx] === '0'){
                to_do_text[idx].style = "text-decoration: line-through; opacity: 0.5";
                complete_bool[idx] = "1";
                if(to_do.length == undo_num){
                    clean_button = document.createElement('button');
                    clean_button.innerHTML = 'Clear complete';
                    clean.appendChild(clean_button);
                }
                undo_num -=1;
                total.innerHTML = undo_num + ' left';
            }
            else{
                to_do_text[idx].style = "text-decoration: none; opacity:none";
                undo_num +=1;
                complete_bool[idx] = "0";
                if(to_do.length === undo_num){
                    clean_button.remove();
                }
                total.innerHTML = undo_num + ' left';
                
            }
    }
    to_do_check[idx].appendChild(check_input[idx]);
    
    check_label[idx] = document.createElement('label');
    check_label[idx].htmlFor = idx;
    to_do_check[idx].appendChild(check_label[idx]);


    to_do_text[idx] = document.createElement('h1');
    to_do_text[idx].classList.add("todo-app__item-detail");
    to_do_text[idx].innerHTML = to_do[idx];
    to_do_elem[idx].appendChild(to_do_text[idx]);

    to_do_del[idx] = document.createElement('img');
    to_do_del[idx].classList.add("todo-app__item-x");
    to_do_del[idx].src = "./img/x.png";
    to_do_del[idx].onclick = function(){
        del_element(idx);
    }
    to_do_elem[idx].appendChild(to_do_del[idx]);

}

function del_element(idx){
    buffer1 = (to_do.length==undo_num);
    if(complete_bool[idx] == 0){
        undo_num -=1;
        total.innerHTML = undo_num + ' left';
    }
    to_do.splice(idx,1);
    to_do_elem.splice(idx,1);
    to_do_text.splice(idx,1);
    to_do_check.splice(idx,1);
    to_do_del.splice(idx,1);
    check_input.splice(idx,1);
    check_label.splice(idx,1);
    complete_bool.splice(idx,1);
    buffer2 = (to_do.length==undo_num);
    if(buffer1 != buffer2){
        clean_button.remove();
    }
    if(to_do.length == 0){
        footer.remove();
        list.remove();
    }


    display();
}

function display(){

    if(current_mode == 1){
        display_ALL();
        view_buttons1.style.border= "1px solid #000000";
        view_buttons2.style.border= "0px solid #000000";
        view_buttons3.style.border= "0px solid #000000";
    }
    if(current_mode == 2){
        display_Active();
        view_buttons2.style.border= "1px solid #000000";
        view_buttons1.style.border= "0px solid #000000";
        view_buttons3.style.border= "0px solid #000000";
    }
    if(current_mode == 3){
        display_Completed();
        view_buttons3.style.border= "1px solid #000000";
        view_buttons2.style.border= "0px solid #000000";
        view_buttons1.style.border= "0px solid #000000";
    }
}

function clear_complete(){
    for(let idx = 0; idx < to_do.length; ){
        if(complete_bool[idx] == 1){
            del_element(idx);
        }
        else idx++;
    display();
    }
}


