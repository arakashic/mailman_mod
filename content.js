// This function will be called whenever the page is loaded or changed
function checkRadioButton() {
  // Check if the page contains the required text
  if (document.body.innerText.indexOf("Administrative requests for mailing list: ") === -1) {
    return;
  }

  // Get all the radio buttons on the page
  const radios = document.querySelectorAll('input[type="radio"]');

  // Create an object to store the counts of each radio button name and class
  const counts = {};

  // Loop through each radio button and increment its count in the object
  radios.forEach(radio => {
    const div = radio.parentElement.querySelector('.hidden');
    const className = div ? div.innerText.trim() : '';

    if (!counts[className]) {
      counts[className] = {
        total: 0,
        checked: 0
      };
    }

    counts[className].total++;

    if (radio.checked) {
      counts[className].checked++;
    }
  });

  // Create a new element to display the information
  const infoElement = document.createElement("div");
  infoElement.style.position = "fixed";
  infoElement.style.top = "0";
  infoElement.style.right = "0";
  infoElement.style.zIndex = "9999";
  infoElement.style.padding = "10px";
  infoElement.style.background = "#fff";
  infoElement.style.border = "1px solid #ccc";

  // Loop through the counts object and display the results
  for (const className in counts) {
    const total = counts[className].total;
    const checked = counts[className].checked;
    let color = '';

    switch (className) {
      case 'Approve':
        color = 'darkgreen';
        break;
      case 'Reject':
        color = 'darkred';
        break;
      case 'Discard':
        color = 'orange';
        break;
      default:
        color = 'black';
    }

    if (className) {
      infoElement.innerHTML += `<span style="color: ${color}">${className}: ${checked}/${total} checked</span><br>`;
    } else {
      infoElement.innerHTML += `<span style="color: ${color}">No class: ${checked}/${total} checked</span><br>`;
    }
  }

  // Add the element to the page
  document.body.appendChild(infoElement);
}

function checkHtmlContent() {
  // Check if the page contains the required text
  if (document.body.innerText.indexOf("Administrative requests for mailing list: ") === -1) {
    return;
  }

  // Get all the textareas on the page
  const textareas = document.querySelectorAll('textarea[name^="fulltext-"]');

  // Loop through each textarea and check if it contains HTML or CSS content
  textareas.forEach(textarea => {
    const content = textarea.value.trim();
    let hasHtmlContent = false;
    let mayHaveHtmlContent = false;
    let text = "No HTML content";
    let bgColor = "#dfd";

    if (content.includes('<') && content.includes('>')) {
      mayHaveHtmlContent = true;
      text = "May have HTML content";
      bgColor = "#ffd";
    }

    if (content.includes('<html') && content.includes('html>')) {
      hasHtmlContent = true;
      text = "Has HTML content";
      bgColor = "#cf1b1b";
    }

    // Create a new element to display the textarea information
    const textareaElement = document.createElement("div");
    textareaElement.style.marginBottom = "10px";
    textareaElement.style.padding = "5px";
    textareaElement.style.background = bgColor;
    textareaElement.style.border = "1px solid #ccc";
    textareaElement.innerHTML = text;

    // Add the textarea element to the page
    textarea.parentElement.insertBefore(textareaElement, textarea);
  });
}

// Call the updateInfo function when the page is loaded or changed
checkRadioButton();
checkHtmlContent();

window.addEventListener("load", checkRadioButton);
window.addEventListener("hashchange", checkRadioButton);

// Update the countings when the user changes the status of radio buttons
document.addEventListener("change", checkRadioButton);
