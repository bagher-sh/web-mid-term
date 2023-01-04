const error = document.getElementById('error');
const user_image = document.getElementById('user-image');
const username = document.getElementById('name');
const user_location = document.getElementById('location');
const blog = document.getElementById('blog');
const bio = document.getElementById('bio');
const input = document.getElementById('input');
const submit = document.getElementById('submit');

const information_div = document.getElementsByClassName('information-div');
const data_div = document.getElementsByClassName('info-div');

async function get_informations() {
    let id = input.value;
    if (window.localStorage.getItem(id) == null) {
        let info = await fetch(`https://api.github.com/users/${id}`).then((response) => response.json())
        if (info.message == "Not Found") {
            information_div[0].style.display = "none"
            bio.style.display = "none";
            data_div[0].style.display = "none"
            data_div[1].style.display = "none"
            data_div[2].style.display = "none"
            data_div[3].style.display = "none"
            error.style.display = "flex";
            error.innerHTML = "Not Found!";
        }
        else {
            window.localStorage.setItem(id, JSON.stringify(data));
            information_div[0].style.display = "flex"
            bio.style.display = "flex";
            data_div[0].style.display = "flex"
            data_div[1].style.display = "flex"
            data_div[2].style.display = "flex"
            data_div[3].style.display = "flex"
            error.style.display = "none";
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