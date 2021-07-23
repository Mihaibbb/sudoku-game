const stars = document.querySelectorAll('.stars i');
const numOfStarsInput = document.querySelector('.number_of_stars');
const submitButton = document.querySelector('.submit-button');

let numOfStars = 0;
stars.forEach((star, index) => {
    
    star.addEventListener('click', () => {
        
        stars.forEach(star => {
            star.classList.add('far');
            star.classList.remove('fas');
        })

        numOfStars = index + 1;
        if (numOfStars > 5) numOfStars = 5;
        for (let i = 0; i < numOfStars; i++) {
            stars[i].classList.remove('far');
            stars[i].classList.add('fas');
        }

        
            
    });
});

submitButton.addEventListener('click', () => {
    numOfStarsInput.value = numOfStars;
});



