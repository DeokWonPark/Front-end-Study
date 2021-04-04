const comics = [
    {
        alias: 'eunsoo',
        id: 6080299074584576,
        title: '은수'
    },
    {
        alias: 'euanso',
        id: 4668122139459584,
        title: '은수'
    },
    {
        alias: 'euwqeoo',
        id: 260,
        title: '은수'
    },
    {
        alias: 'esorrqwo',
        id: 5912899326836736,
        title: '은수'
    },
];

const template = comics => `
    ${comics.map(comic => `
        <li class="comic" data-id="${comic.id}">
            <a href="https://www.lezhin.com/comic/${comic.alias}" class='info'></a>
        </li>
    `).join('')}
`;

document.querySelector('#comics').innerHTML=template(comics);

const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }

        const target = entry.target;
        const id = target.dataset.id;

        target.querySelector('.info').style.backgroundImage = `url(https://cdn.lezhin.com/v2/comics/${id}/images/wide?width=600)`;

        observer.unobserve(target);
    });
});

Array.from(document.querySelectorAll('.comic')).forEach(el => {
    io.observe(el);
});
