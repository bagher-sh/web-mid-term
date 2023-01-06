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
const programing_language = document.getElementById('programing-language');

/* 
using https://api.github.com/users/ 
get user information and put them in html elements
*/
async function get_information() {
    let id = input.value;
    var has_error = false
    // check if information is available in local storage
    if (window.localStorage.getItem(id) == null) {
        var response = await fetch(`https://api.github.com/users/${id}`).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        var info = response.body
        // check if an error occurred
        if (info.message == "Not Found" || response.status != 200) {
            has_error = true
            information_div[0].style.display = "none"
            data_div[0].style.display = "none"
            data_div[1].style.display = "none"
            data_div[2].style.display = "none"
            data_div[3].style.display = "none"
            error.style.display = "flex";
            // check if username does not exist
            if (info.message == "Not Found") {
                error.innerHTML = "Not Found!";
            } 
            else {
                error.innerHTML = "Network Error!";
            }
        }
        // add user information to local storage
        else {
            window.localStorage.setItem(id, JSON.stringify(info));
            status_message.style.display = 'none'
        }
    }
    // get user information from local storage
    else {
        var info = JSON.parse(window.localStorage.getItem(id));
        status_message.style.display = 'flex'
    }
    // put information to html elements
    if (has_error != true) {
        information_div[0].style.display = "flex"
        error.style.display = "none";            
        data_div[0].style.display = "flex"
        data_div[1].style.display = "flex"
        data_div[2].style.display = "flex"
        data_div[3].style.display = "flex"
        
        programing_language.innerHTML = "";
        // check if avatar_url does not exist
        if (info.avatar_url != null) {
            // set image
            user_image.src = info.avatar_url;
        }
        else {
            // set default avatar
            user_image.src = "avatars-LwFmgU73oi5NY1qw-EpyLKA-t500x500.jpg";
        }
        // check if avatar_url does not exist
        if (info.name != null) {
            // set name
            username.innerHTML = info.name;
            username.style.color = "Black"
        }
        else {
            // set "There is no name!" message
            username.innerHTML = "There is no name!";
            username.style.color = "DeepPink"
        }
        // check if blog does not exist
        if (info.blog != "") {
            blog.innerHTML = info.blog;
            blog.style.textDecoration = "underline"
            // check if the blog content is a link
            // set blog link
            if (info.blog.includes("http")) {
                blog.href = info.blog;
            } 
            else {
                blog.href = "http://" + info.blog;
            }
            blog.style.color = "DarkBlue"
        }
        else {
            // set "There is no blog!" message
            blog.innerHTML = "There is no blog!";
            blog.style.textDecoration = "none"
            blog.href = "#";
            blog.style.color = "DeepPink"
        }
        // check if location does not exist
        if (info.location != null) {
            // set location
            user_location.innerHTML = info.location;
            user_location.style.color = "Black"
        }
        else {
            // set "There is no location!" message
            user_location.innerHTML = "There is no location!";
            user_location.style.color = "DeepPink"
        }
        // check if bio does not exist
        if (info.bio != null) {
            // replace \n and \r with <br>
            bio.innerHTML = info.bio.replace(/(\r\n|\n|\r)/gm, "<br>");;
            bio.style.color = "Black"
        }
        else {
            // set "There is no bio!" message
            bio.innerHTML = "There is no bio!";
            bio.style.color = "DeepPink"
        }
    }
    // get most used programing language
    most_used_language = await get_programing_language();
    // check if most_used_language does not exist
    if (most_used_language != null) {
        // set most_used_language
        programing_language.innerHTML = most_used_language;
    }
    else {
        // set nothing for most_used_language
        programing_language.innerHTML = "";
    }
}


/* 
using https://api.github.com/users/username/repos
get repositories information and return most_used_language
*/
async function get_programing_language(){
    var id = input.value;
    let info = await fetch(`https://api.github.com/users/${id}/repos`).then((res) => res.json())
    // sort repositories by pushed_at attribute
    info.sort((a, b) => (a.pushed_at > b.pushed_at) ? -1 : 1);
    let end_index = Math.min(info.length, 5);
    // find last 5 repositories
    let last_repositories = info.slice(0, end_index);
    let languages = []
    // find last 5 languages
    last_repositories.forEach((element) => {
        if (element.language != null){
            languages.push(element.language)
        }
    });
    // find most used language in the last 5 repositories
    let most_used_language = languages.sort((a,b) =>
            languages.filter(v => v===a).length
            - languages.filter(v => v===b).length
    ).pop();
    return most_used_language
}

// call the get_information function by clicking submit
submit.addEventListener('click', get_information);
// call the get_information function by pressing enter
var elem = document.getElementById("input");
elem.onkeyup = function(e){
    if(e.keyCode == 13){
        get_information();
    }
}