document.addEventListener('DOMContentLoaded', () => {
    const jokes = document.querySelector("#display-jokes");
    const getJokesBtn = document.querySelector("#get-jokes");
    let jokesList = [];
    let currentIndex = 0;
    let currentPage = 1;

    getJokesBtn.addEventListener('click', async () => {
        getJokesBtn.textContent = 'Get Another Jokes';

        try {
            const joke = await fetchJokes(currentPage);
            displayJokes(joke);
        } catch (error) {
            console.error(error.message)
        }
        
    });

    async function fetchJokes(page){
        const url = `https://api.freeapi.app/api/v1/public/randomjokes?page=${page}`;
        try {
            const respons = await fetch(url)
            if (!respons.ok) {
                throw new Error('Failed to fetch jokes')
            } else{
                return await respons.json()
            }
            
        } catch (error) {
            console.error(error.message)
        }

    };
    function displayJokes(joke){
        console.log(joke);
        jokesList = joke.data.data;
        if (currentIndex <= jokesList.length) {
            jokes.textContent = jokesList[currentIndex].content;
            currentIndex++;
            if (currentIndex == jokesList.length) {
                currentPage++;
                currentIndex = 0;
            }
        }
    };
})