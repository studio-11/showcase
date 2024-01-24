const listener = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const bookmark = e.currentTarget;
    const id = bookmark.id.replace('item-', '');
    const type = bookmark.dataset.type;
    const checked = !(bookmark.dataset.checked === 'true');

    const data = new FormData();
    data.append('id', id);
    data.append('type', type);
    data.append('add', checked);

    fetch('/account/manage-my-waiting-list', {
        method: 'POST',
        body: data
    }).then(function (response) {
        const bookmarks = document.querySelectorAll(".js-bookmark-trigger");
        bookmarks.forEach(function (b) {
            if (b.id === bookmark.id) {
                b.dataset.checked = checked;
                if (checked) {
                    b.classList.add('checked');
                } else {
                    b.classList.remove('checked');
                }
            }
        });
    });
};

window.addEventListener("load", function () {
    var bookmarks = document.querySelectorAll(".js-bookmark-trigger");
    if (bookmarks) {
        bookmarks.forEach(function (bookmark) {
            bookmark.removeEventListener("click", listener);
            bookmark.addEventListener("click", listener);
        });
    }
});

