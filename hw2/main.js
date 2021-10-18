let album = new Array(10); 
let img_color = new Array(50);
let album_color = new Array(10);

for (var i = 0; i < 10; i++) {
    album[i] = new Array(50);
}

album[0] =  [
    "https://media.istockphoto.com/photos/capybara-pantanal-wetlands-brazil-picture-id157616075?b=1&k=20&m=157616075&s=170667a&w=0&h=kRWmxkX3VF9tvcUSzanMojS1o3QyDv9BlCgEJ_xmWYM=",
    "https://media.istockphoto.com/photos/brazilian-capybara-picture-id1311299604?b=1&k=20&m=1311299604&s=170667a&w=0&h=lJp2GdWjCwweCMe2BS7B38Fk04f3pFze9mvbKhGa6ZU=",
    "https://media.istockphoto.com/photos/group-of-capybara-on-a-river-bank-in-pantanal-brazil-picture-id500870818?b=1&k=20&m=500870818&s=170667a&w=0&h=a3wAkjhbVa9TCH1ogiCQ5rdw1Dckq3ws1H48a9FvAxw=",
    "https://media.istockphoto.com/photos/swimming-capybara-portrait-picture-id1201693169?b=1&k=20&m=1201693169&s=170667a&w=0&h=ESdrd9L5XWXCpqKsaBtBKdfIvfzB7tALqDQqIS12udk=",
    "https://media.istockphoto.com/photos/capybara-in-the-lake-water-with-bird-the-biggest-mouse-around-the-picture-id1250415507?b=1&k=20&m=1250415507&s=170667a&w=0&h=R4dnZ5DlUIx1k-t3Zv2eUH2gnBS6YMg-urdSSm7FR3I=",
    "https://media.istockphoto.com/photos/capybaras-playing-in-the-water-picture-id587935030?b=1&k=20&m=587935030&s=170667a&w=0&h=lQ4hHpw_gQNld7-LsCg4LtHx2iDvtXIFD3duCPRUkHA=",
    "https://media.istockphoto.com/photos/capybara-picture-id840135662?k=20&m=840135662&s=612x612&w=0&h=-Y6rjcEQc7tUVn3iDybc3N1ICzllHruQhwyb9kW0yQw=",
    "https://images.unsplash.com/photo-1624329809999-a2a576b0f690?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FweWJhcmF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60",
    "https://images.unsplash.com/photo-1633123784883-9cc9ba6d8c9e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FweWJhcmF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60",
    "https://media.istockphoto.com/photos/capybara-onsen-picture-id518705814?k=20&m=518705814&s=612x612&w=0&h=jCbcjTg6xCqoyt3LxmkaMydexOyzoUhmrKO13uZFe68="
] ;

album[1] =  [
    "https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1143&q=80",
    "https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1229&q=80",
    "https://images.unsplash.com/photo-1529257414772-1960b7bea4eb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1491485880348-85d48a9e5312?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1598188306155-25e400eb5078?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1168&q=80",
    "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
] ;

album[2] = [
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80",
    "https://images.unsplash.com/photo-1554456854-55a089fd4cb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
    "https://images.unsplash.com/photo-1527526029430-319f10814151?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80",
    "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1578133559556-9e83af5fc5f3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
] ; 






let current_album = 0;
var last_idx=0;

let display_img = document.getElementById("display");

album_color[0] = document.getElementById("album0");
album_color[1] = document.getElementById("album1");
album_color[2] = document.getElementById("album2");
img_color[0] = document.getElementById("small_img0");
img_color[1] = document.getElementById("small_img1");
img_color[2] = document.getElementById("small_img2");
img_color[3] = document.getElementById("small_img3");
img_color[4] = document.getElementById("small_img4");
img_color[5] = document.getElementById("small_img5");
img_color[6] = document.getElementById("small_img6");
img_color[7] = document.getElementById("small_img7");
img_color[8] = document.getElementById("small_img8");
// img_color[9] = document.getElementById("small_img9");



initial();

function initial(){

    album_select();
    load_album();
    set_img(0);
    change_border(0);
    count();
}

function album_select(){
    album_color[current_album].style.border= "3px solid #00B8B8";
}

function album_unselect(){
    album_color[current_album].style.border= "3px solid #FFFFFF";
}



function load_album(){
    for(let idx = 0; idx < album[current_album].length; idx++){
        add_picture(idx);
        img_color[idx].src = album[current_album][idx];
    }
}

function click_img(idx){
    if(last_idx != idx){
        set_img(idx);
        change_border(idx);
        close_border(last_idx);
        last_idx = idx;
        count();
    }

}

function set_img(index){
    display_img.src = album[current_album][index];
}

function change_border(idx){
    img_color[idx].style.border= "3px solid #00B8B8";
}

function close_border(idx){
    img_color[last_idx].style.border= "3px solid #FFFFFF";
}


function change_album(idx){
        album_unselect();
        current_album = idx;
        album_select();
        delete_album();
        load_album();
        set_img(0);
        change_border(0);
        last_idx=0;
        count();
}



function add_picture(idx){
    var img = document.createElement('img');
    img.classList.add("image");
    img.src = album[current_album][idx];
    var string = "small_img" + idx ;
    img.id = string;
    img.onclick = function(){
        click_img(idx)
    };
    console.log(img.onclick);
    document.getElementById('scroll').appendChild(img);
    img_color[idx] = document.getElementById(string);

}

function delete_album(){
    document.getElementById('scroll').innerHTML='<img class="capy_bg" src="" id = "display">';
    display_img = document.getElementById("display");
}

function search(){
    const links = document.getElementById("links").value;
    idx = album[current_album].length;
    add_picture(idx);
    img_color[idx].src = links;
    if(!img_color[idx].complete){
        alert("add link : "+links+" fails");
        img_color[idx].remove();
    }
    else{
        album[current_album].push(links);
        alert("add link : "+links+" succeeds");
    }

}
function count(){
    document.getElementById("count").innerHTML= (last_idx+1)+" / "+album[current_album].length+" / "+(album[0].length+album[1].length+album[2].length);
}

function delete_img(){
    img_color[last_idx].remove();
    console.log(last_idx);
    album[current_album].splice(last_idx,1);
    alert("image deleted");
    change_album(current_album);
}



