const likeButtons = document.querySelectorAll('.like');
const dislikeButtons = document.querySelectorAll('.dislike');

const loginBtn = document.querySelector('.login');
let login = false;
if (loginBtn !== null) {
    login = true;
    loginBtn.remove();
}




likeButtons.forEach(likeButton => {
    likeButton.addEventListener('click', () => {
        if (!login) return;
        likeButton.classList.toggle('active');
        const likesNumber = likeButton.querySelector('.numbers');
        const userDislikeButton = likeButton.parentElement.querySelector('.dislike');
        const dislikesNumber = userDislikeButton.querySelector('.numbers');
        const idUser = likeButton.parentElement.parentElement.querySelector('.profile .id').innerText;

        if (likeButton.classList.contains('active')) {
            likesNumber.innerText = parseInt(likesNumber.innerText) + 1;
        } else {
            likesNumber.innerText = parseInt(likesNumber.innerText) - 1;
        } 
        
        if (userDislikeButton.classList.contains('active')) {
            userDislikeButton.classList.remove('active');   
            dislikesNumber.innerText = parseInt(dislikesNumber.innerText) - 1; 
        }

        createXMLRequest(likesNumber.innerText, dislikesNumber.innerText, "likes", idUser);
       
    });
});

dislikeButtons.forEach(dislikeButton => {
    dislikeButton.addEventListener('click', () => {
        if (!login) return;
        dislikeButton.classList.toggle('active');
        const userLikeButton = dislikeButton.parentElement.querySelector('.like');
        const dislikesNumber = dislikeButton.querySelector('.numbers');
        const likesNumber = userLikeButton.querySelector('.numbers');
        const idUser = dislikeButton.parentElement.parentElement.querySelector('.profile .id').innerText;

        if (dislikeButton.classList.contains('active')) {
            dislikesNumber.innerText = parseInt(dislikesNumber.innerText) + 1;
            
        } else {
            dislikesNumber.innerText = parseInt(dislikesNumber.innerText) - 1;
            
        }
        
        if (userLikeButton.classList.contains('active')) {
            userLikeButton.classList.remove('active');
            likesNumber.innerText = parseInt(likesNumber.innerText) - 1;   
        }

        createXMLRequest(likesNumber.innerText, dislikesNumber.innerText, "dislikes", idUser);
    });
   
}); 

const createXMLRequest = (likes, dislikes, type, id) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', './update_feedback/update_feedback.inc.php', true);
    //Send the proper header information along with the request
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
   

    xhttp.onreadystatechange = function() {//Call a function when the state changes.
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
        }
    }
    console.log(likes, dislikes)
    xhttp.send(`type=${type}&likes=${likes}&dislikes=${dislikes}&id=${id}`);
};

 // Dark mode 

 const darkModeButton = document.querySelector("nav .dark_mode");

 darkModeButton.addEventListener("click", () => {

     const darkModeIcon = darkModeButton.querySelector("i");
     if (darkModeIcon.classList.contains("fa-moon")) {
         darkMode();      
         localStorage.setItem("darkMode", JSON.stringify("on"));     
     }

     if (darkModeIcon.classList.contains("fa-sun")) {
         lightMode();    
         localStorage.setItem("darkMode", JSON.stringify("off"));
     }
 });

 const allReviews = document.querySelectorAll('.review');

 const darkMode = () => {
     darkModeButton.innerHTML = "<i class='fas fa-sun'></i>";
     allReviews.forEach(review => review.classList.add('dark'));
 };

 const lightMode = () => {
     darkModeButton.innerHTML = "<i class='fas fa-moon'></i>";
     allReviews.forEach(review => review.classList.remove('dark'));
 };

 // Dark mode local storage

 if (JSON.parse(localStorage.getItem("darkMode")) === "on") darkMode();
 else if (JSON.parse(localStorage.getItem("darkMode")) === "off") lightMode();


