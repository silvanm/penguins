Replaystore = function (playground, cards) {
    this.playground = playground;
    this.cards = cards;
}

Replaystore.prototype = {
    steps: [],
    stepCounter: 0,
    spielfeld: null,
    cards: null,

    record: function (step) {
        this.steps.push(step);
    },

    done: function() {
        return (this.stepCounter >= this.steps.length);
    },

    playStep: function () {
        with (this.steps[this.stepCounter]) {
            console.log(this.steps[this.stepCounter])
            switch (command) {
                case 'place':
                    this.playground.place(this.cards[cardId], parseInt(nextPos / 3), nextPos % 3)
                    break;
                case 'rotate':
                    this.cards[cardId].rotate(quarts);
                    break;
                case 'remove':
                    this.playground.removeByPos(parseInt(nextPos / 3), nextPos % 3)
                    break;
            }
        }

        this.stepCounter++;
    }
}
