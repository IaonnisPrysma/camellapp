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
});
