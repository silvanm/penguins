
Cardstack = function () {
}

Cardstack.prototype = {
    cards: [],

    /**
     *
     * @param card
     */
    push: function (card) {
        this.cards.push(card)
    },

    /**
     * Reset all cards in the stack
     */
    reset: function () {
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].reset();
        }
    },

    /**
     * Turn on the animation for each card in the stack
     */
    enableDomAnimation: function () {
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].animateDom = true;
        }
    },
}

