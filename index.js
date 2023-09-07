const btn = document.getElementById("button");
const feedbackMessage = document.getElementById("feedback-message"); 

btn.addEventListener("click", function () {
    let colorValue = document.getElementById("color-select").value;
    let mode = document.getElementById("mode-select").value;
    let hexValue = colorValue.slice(1);

    fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${mode}`)
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("container").innerHTML = "";
            const colorsArr = data.colors;
            const container = document.getElementById("container");

            colorsArr.forEach((newColor) => {
                let showColor = newColor.hex.value;

                // Create a color display element
                const colorDiv = document.createElement("div");
                colorDiv.style.backgroundColor = showColor;
                colorDiv.className = "color-box";

                // Create a paragraph with the color value
                const colorParagraph = document.createElement("p");
                colorParagraph.className = "color-tag";
                colorParagraph.textContent = showColor;

                // Add the paragraph to the color display element
                colorDiv.appendChild(colorParagraph);

                // Add a click event listener to copy the color to the clipboard
                colorDiv.addEventListener("click", function () {
                    // Create a temporary input element to copy the color value
                    const tempInput = document.createElement("input");
                    document.body.appendChild(tempInput);
                    tempInput.setAttribute("value", showColor);
                    tempInput.select();
                    document.execCommand("copy");
                    document.body.removeChild(tempInput);

                    // Change cursor style to indicate a successful copy
                    colorDiv.style.cursor = "copy";

                    // Set the feedback message
                    feedbackMessage.textContent = "Color copied";

                    // Reset cursor style and clear the message after a short delay
                    setTimeout(() => {
                        colorDiv.style.cursor = "pointer";
                        feedbackMessage.textContent = ""; // Clear the message
                    }, 2000); // Change back after 1 second (adjust as needed)
                });

                // Add the color display element to the container
                container.appendChild(colorDiv);
            });
        });
});
