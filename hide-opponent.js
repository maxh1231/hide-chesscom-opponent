
const observer = new MutationObserver(() => {
    hideElements();
});

observer.observe(document.body, { childList: true, subtree: true });

const hideElements = () => {

    let parent = document.querySelector('div.player-component.player-top > div.player-tagline > div.user-tagline-component')

    let oppName = parent?.querySelector('a.user-username-component');
    let oppElo = parent?.querySelector('span');
    let oppFlag = parent?.querySelector('div.country-flags-component');
    let oppFlair = parent?.querySelector('img.flair-rpc-component');

    oppName.textContent = '';
    oppElo.textContent = '';
    oppFlag.style.display = 'none'
    oppFlair.style.display = 'none';
}


