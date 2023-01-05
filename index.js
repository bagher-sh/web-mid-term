const information_div = document.getElementsByClassName('information-div');
const data_div = document.getElementsByClassName('info-div');

const error = document.getElementById('error');
const user_image = document.getElementById('user-image');
const username = document.getElementById('name');
const user_location = document.getElementById('location');
const blog = document.getElementById('blog');
const bio = document.getElementById('bio');
const input = document.getElementById('input');
const submit = document.getElementById('submit');
const status_message = document.getElementById('status');

async function get_informations() {
    let id = input.value;
    var has_error = false
    if (window.localStorage.getItem(id) == null) {
        var response = await fetch(`https://api.github.com/users/${id}`).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        var info = response.body
        if (info.message == "Not Found" || response.status != 200) {
            has_error = true
            information_div[0].style.display = "none"
            data_div[0].style.display = "none"
            data_div[1].style.display = "none"
            data_div[2].style.display = "none"
            data_div[3].style.display = "none"
            error.style.display = "flex";
            if (info.message == "Not Found") {
                error.innerHTML = "Not Found!";
            } 
            else {
                error.innerHTML = "Network Error!";
            }
        }
        else {
            window.localStorage.setItem(id, JSON.stringify(info));
            status_message.style.display = 'none'
        }
    }
    else {
        var info = JSON.parse(window.localStorage.getItem(id));
        status_message.style.display = 'flex'
    }
    if (has_error != true) {
        information_div[0].style.display = "flex"
        error.style.display = "none";            
        data_div[0].style.display = "flex"
        data_div[1].style.display = "flex"
        data_div[2].style.display = "flex"
        data_div[3].style.display = "flex"
        
        if (info.avatar_url != null) {
            user_image.src = info.avatar_url;
        }
        else {
            user_image.src = "avatars-LwFmgU73oi5NY1qw-EpyLKA-t500x500.jpg";
        }
        if (info.name != null) {
            username.innerHTML = info.name;
            username.style.color = "Black"
        }
        else {
            username.innerHTML = "There is no name!";
            username.style.color = "DeepPink"
        }
        if (info.blog != "") {
            blog.innerHTML = info.blog;
            blog.style.textDecoration = "underline"
            blog.href = info.blog;
            blog.style.color = "Black"
        }
        else {
            blog.innerHTML = "There is no blog!";
            blog.style.textDecoration = "none"
            blog.href = "#";
            blog.style.color = "DeepPink"
        }
        if (info.location != null) {
            user_location.innerHTML = info.location;
            user_location.style.color = "Black"
        }
        else {
            user_location.innerHTML = "There is no location!";
            user_location.style.color = "DeepPink"
        }
        if (info.bio != null) {
            bio.innerHTML = info.bio.replace(/(\r\n|\n|\r)/gm, "<br>");;
            bio.style.color = "Black"
        }
        else {
            bio.innerHTML = "There is no bio!";
            bio.style.color = "DeepPink"
        }
    }

}

submit.addEventListener('click', get_informations);
var elem = document.getElementById("input");
elem.onkeyup = function(e){
    if(e.keyCode == 13){
        get_informations();
    }
}