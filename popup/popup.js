document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabName).classList.add('active');
            tabs.forEach(t => {
                t.classList.remove('active');
            });
            tab.classList.add('active');
        });
    });

    // Add event listener for the "Editar Perfil" button
    const editProfileButton = document.getElementById('edit-profile-button');
    if (editProfileButton) {
        editProfileButton.addEventListener('click', () => {
            const url = chrome.runtime.getURL('popup/index.html'); // Get the full URL
            chrome.tabs.create({ url: url }); // Opens in a new tab
        });
    }

    // Add event listener for the "Close this popup" button
    const closePopupButton = document.getElementById('close-popup-button');
    if (closePopupButton) {
        closePopupButton.addEventListener('click', () => {
            window.close(); // Closes the popup
        });
    }

    // Get the current tab and send a message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getPageInfo" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                } else if (response) {
                    const { url, title } = response;
                    console.log(`Current page URL: ${url}`);
                    console.log(`Current page title: ${title}`);

                    // Image switching logic
                    const magnetoImage = document.querySelector('img[alt="Image 1"]');
                    const linkedinImage = document.querySelector('img[alt="Image 2"]');

                    if (url.includes("https://www.magneto365.com")) {
                        magnetoImage.src = "Home/alliedLogos/Magneto.png";
                    } else {
                        magnetoImage.src = "Home/alliedLogos/MagnetoOFF.png";
                    }

                    if (url.includes("https://www.linkedin.com/")) {
                        linkedinImage.src = "Home/alliedLogos/Linkedin.png";
                    } else {
                        linkedinImage.src = "Home/alliedLogos/LinkedinOFF.png";
                    }
                }
            });
        } else {
            console.error("No active tab found.");
        }
    });
});
