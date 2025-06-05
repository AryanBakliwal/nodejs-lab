let games = [
    {id: '1', title: 'Zelda', platform: ['PS5', 'Xbox']},
    {id: '2', title: 'Halo Infinite', platform: ['Xbox']},
    {id: '3', title: 'God of War', platform: ['PS5']},
    {id: '4', title: 'Minecraft', platform: ['PS5', 'Xbox']},
    {id: '5', title: 'Cyberpunk 2077', platform: ['PS5', 'Xbox']},
    {id: '6', title: 'Elden Ring', platform: ['PS5', 'Xbox']}
];

let authors = [
    {id: '1', name: 'mario', verified: true},
    {id: '2', name: 'luigi', verified: false},
    {id: '3', name: 'peach', verified: true},
    {id: '4', name: 'toad', verified: false},
    {id: '5', name: 'bowser', verified: true}
];

let reviews = [
    {id: '1', rating: 4, content: 'Boring', author_id: '1', game_id: '2'},
    {id: '2', rating: 8, content: 'Great game!', author_id: '2', game_id: '1'},
    {id: '3', rating: 7, content: 'Enjoyable but buggy.', author_id: '3', game_id: '5'},
    {id: '4', rating: 10, content: 'Masterpiece!', author_id: '4', game_id: '6'},
    {id: '5', rating: 6, content: 'Not bad.', author_id: '5', game_id: '4'},
    {id: '6', rating: 8, content: 'Pretty fun overall.', author_id: '2', game_id: '3'},
    {id: '7', rating: 9, content: 'Amazing experience.', author_id: '3', game_id: '2'},
    {id: '8', rating: 7, content: 'Solid gameplay.', author_id: '1', game_id: '5'},
    {id: '9', rating: 10, content: 'Incredible visuals!', author_id: '4', game_id: '1'},
    {id: '10', rating: 5, content: 'Could be better.', author_id: '5', game_id: '6'}
];

module.exports = {games, reviews, authors};