$(function () {

    var cards = [];

    // Initialize the cards
    cards.push(new Card(
        1,
        [
            ['I', true],  // Indian - head
            ['B', false], // Basketball - feet
            ['S', false], // Ski - feet
            ['B', true]   // Basketball - head
        ]
    ));

    cards.push(new Card(
        2,
        [
            ['B', false],
            ['I', false],
            ['K', true],
            ['S', true]
        ]
    ));
    cards.push(new Card(
        3,
        [
            ['K', true],
            ['S', false],
            ['I', false],
            ['B', true]
        ]
    ));
    cards.push(new Card(
        4,
        [
            ['S', true],
            ['I', false],
            ['K', false],
            ['B', true]
        ]
    ));

    cards.push(new Card(
        5,
        [
            ['K', true],
            ['B', true],
            ['I', false],
            ['S', false]
        ]
    ));

    cards.push(new Card(
        6,
        [
            ['I', true],
            ['K', false],
            ['S', false],
            ['B', true]
        ]
    ));

    cards.push(new Card(
        7,
        [
            ['B', false],
            ['S', false],
            ['K', true],
            ['I', true]
        ]
    ));

    cards.push(new Card(
        8,
        [
            ['K', true],
            ['S', true],
            ['K', false],
            ['I', false]
        ]
    ));

    cards.push(new Card(
        9,
        [
            ['K', false],
            ['S', false],
            ['B', true],
            ['I', true]
        ]
    ));

    var playground = new Playground();

    var interationCounter = 0;

    var replayStore = new Replaystore(playground, cards);

    // The recursive function to find the solution.
    // Updating the DOM is only being done in a second pass
    function iterate(cards, nextPos) {
        for (var cardIx = 0; cardIx < cards.length; cardIx++) {
            var card = cards[cardIx];
            if (card.isPlaced()) {
                continue;
            }
            playground.place(card, parseInt(nextPos / 3), nextPos % 3);
            replayStore.record({
                'command': 'place',
                'nextPos': nextPos,
                'cardId': cardIx
            })

            for (var quart = 0; quart < 4; quart++) {
                card.rotate(quart);
                replayStore.record({
                    'command': 'rotate',
                    'quarts': quart,
                    'cardId': cardIx
                })
                if (playground.isValid()) {
                    // Don't iterate if all cards have been placed
                    if (nextPos == cards.length - 1) {
                        return true;
                    } else {
                        if (iterate(cards, nextPos + 1, false)) {
                            return true;
                        }
                    }
                }
            }
            playground.removeByPos(parseInt(nextPos / 3), nextPos % 3)
            replayStore.record({
                'command': 'remove',
                'nextPos': nextPos
            })
        }
    }

    // Trigger the first pass
    iterate(cards, 0)

    // Second pass: Enable Dom animation but use the
    // recorded sequence in "replayStore"
    $("#stepcounter").progressbar({
        value: 0
    });

    player = new Player(replayStore, playground, cards, function (step) {
        $("#stepcounter").progressbar({
            value: step,
            max: replayStore.steps.length
        });
    })

    $('#start').on('click', function () {
        player.startStop()
        $('#start span').toggleClass('glyphicon-play')
            .toggleClass('glyphicon-pause')
    })

    $('#reset').on('click', function () {
        player.reset()
    })

    $("#speed").slider({
        range: "max",
        min: 1,
        max: 50,
        value: 5,
        slide: function (event, ui) {
            if (ui.value < 5) {
                $('body').addClass('slow-transitions')
            } else {
                $('body').removeClass('slow-transitions')
            }
            player.setSpeed(ui.value)
        }
    });
    player.setSpeed(5)
});

