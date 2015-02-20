Playground = function () {

}

Playground.prototype = {
    fields: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],

    reset: function () {
        for (var row = 0; row < this.fields.length; row++) {
            for (var col = 0; col < this.fields[row].length; col++) {
                this.removeByPos(row, col);
            }
        }
    },

    place: function (card, top, left) {
        this.validateField(top, left);
        if (this.fields[top][left] !== null) {
            throw "Field " + top + "/" + left + " is not empty"
        }
        this.fields[top][left] = card;
        card.place(top, left);
    },

    removeByPos: function (top, left) {
        this.validateField(top, left);
        var c = this.fields[top][left];
        if (c !== null) {
            c.remove();
            this.fields[top][left] = null
        };
    },

    validateField: function (top, left) {
        if (top < 0 || top >= this.fields.length) {
            throw "Illegal value top=" + top
        }
        if (left < 0 || left >= this.fields[top].length) {
            throw "Illegal value left=" + left
        }
    },

    dumpFields: function () {
        for (var top = 0; top < 3; top++) {
            console.log(top + ": " + (this.fields[top][0] ? this.fields[top][0].id : '.')
            + "-" + (this.fields[top][1] ? this.fields[top][1].id : '.')
            + "-" + (this.fields[top][2] ? this.fields[top][2].id : '.'))
        }
    },

    /* Verify if the cards have matching borders */
    isValid: function () {
        for (var row = 0; row < this.fields.length; row++) {
            for (var col = 0; col < this.fields[row].length; col++) {
                var currentCard = this.fields[row][col];

                if (currentCard == null) {
                    continue
                }
                // checking East Edge
                var cardToTheRight = col < this.fields[row].length - 1 ? this.fields[row][col + 1] : null;
                // go through each card and right and bottom border (that's enough)

                // edge card or no card? - then no test necessary
                if (cardToTheRight === null) {

                } else {

                    var myFigure = currentCard.layout[(5 - currentCard.rotation) % 4];
                    var otherFigure = cardToTheRight.layout[(7 - cardToTheRight.rotation) % 4];

                    // check matching figures
                    if ((myFigure[0] != otherFigure[0]) || (myFigure[1] == otherFigure[1])) {
                        return false;
                    }
                }

                // checking bottom edge
                var cardBelow = row < this.fields.length - 1 ? this.fields[row + 1][col] : null;

                // bottom edge card? - then no test necessary
                if (cardBelow === null) {
                } else {

                    var myFigure = currentCard.layout[(6 - currentCard.rotation) % 4];
                    var otherFigure = cardBelow.layout[(4 - cardBelow.rotation) % 4];

                    // check matching figures
                    if ((myFigure[0] != otherFigure[0]) || (myFigure[1] == otherFigure[1])) {
                        return false;
                    }
                }

            }
        }
        return true;
    }
}
