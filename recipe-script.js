// Get recipe id from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');
const instructionsContainer = document.getElementById('instructions');
fetch(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=dfdb24521211484f853aa615b909f2e2`)
            .then(response => response.json())
            .then(data => {
                // Check if data has instructions
                if (data && data.length > 0) {
                    // Extract instructions from each step
                    const steps = data[0].steps;

                    // Create HTML elements for each step
                    const instructionsContainer = document.getElementById('instructions');
                    steps.forEach(step => {
                        var stepElement = document.createElement('p');
                        stepElement.textContent = step.step;
                        instructionsContainer.appendChild(stepElement);
                    });

                    // Display the instructions container
                    instructionsContainer.style.display = 'block';
                } else {
                    console.error('No instructions found for the recipe.');
                }
            })
            .catch(error => console.error('Error fetching instructions:', error));
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=dfdb24521211484f853aa615b909f2e2&&includeNutrition=true`;
        
    // Fetch data from Spoonacular API
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function (data) {
            // Update your HTML with ingredients
            const ingredientsList = data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('');
            $(".ingredients").html(`<ul>${ingredientsList}</ul>`);
            const imageUrl = data.image;
        $("#recipeImage").css("background-image", `url(${imageUrl})`);
        const recipeTitle = data.title;
        $("#recipeTitle").text(recipeTitle);
        const servings = data.servings;
        const cookingTime = data.readyInMinutes;

        $("#recipeServings").html(`<i class="fa-solid fa-utensils"></i>${servings} servings`);
        $("#recipeCookingTime").html(`<i class="fa-solid fa-clock"></i>${cookingTime} minutes`);
            const nutritionInfo =data.nutrition.nutrients.slice(0,10);
            const nutritionList = nutritionInfo.map(nutrient => `<li>${nutrient.name}: ${nutrient.amount} ${nutrient.unit}</li>`).join('');
            $(".nutri").html(`<ul>${nutritionList}</ul>`);
        },
        error: function (error) {
            console.error('Error fetching data:', error);
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        // Add click event listener to the download button
        document.getElementById("downloadBtn").addEventListener("click", function () {
            // Get the HTML content of the target page
            var anotherPageContent = document.getElementById("new").outerHTML; // Replace documentElement with the appropriate selector for the target page
    
    
            // Fetch the image data as base64
            fetch(recipeImageUrl)
                .then(response => response.blob())
                .then(blob => {
                    var reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = function () {
                        // Embed the image in the HTML content
                        anotherPageContent = anotherPageContent.replace('</body>', `<img src="${reader.result}" /></body>`);
                        anotherPageContent = `<div style="background-color: #e6f7ff">${anotherPageContent}</div>`;
                        // Create a Blob object from the updated HTML content
                        var blob = new Blob([anotherPageContent], { type: "text/html" });
    
                        // Create a temporary anchor element
                        var downloadLink = document.createElement("a");
    
                        // Set the href attribute to the URL of the Blob object
                        downloadLink.href = URL.createObjectURL(blob);
    
                        // Set the download attribute with the desired filename
                        downloadLink.download = "downloaded_page.html";
    
                        // Append the anchor element to the document body
                        document.body.appendChild(downloadLink);
    
                        // Simulate a click on the anchor element
                        downloadLink.click();
    
                        // Remove the anchor element from the document body
                        document.body.removeChild(downloadLink);
                    }
                });
        });
    });
    