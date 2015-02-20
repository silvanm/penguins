Card = function (id, layout, animateDom) {
    this.id = id;
    this.layout = layout;
    this.animateDom = animateDom;
    this.node = $('<div></div>')
        .addClass('karte')
        .attr('id', 'karte-' + id)
        .css('backgroundImage', 'url(images/karte' + id + ".jpg)")

    $('#playground-and-stack').append(this.node);
    this.setOnStack();
}

Card.prototype = {
    node: null,
    top: null,
    left: null,
    rotation: 0,
    id: null,
    animateDom: false,
    cardWidth: 150,

    reset: function () {
        top = null;
        left = null;
        if (this.animateDom) {
            this.setOnStack()
        }
        rotation = 0;
    },

    setOnStack: function () {
        this.node.css({top: (this.id - 1) * (20), left: 3.5 * this.cardWidth});
    },

    place: function (top, left) {
        this.top = top;
        this.left = left;
        if (this.animateDom) {
            this.node.css({top: top * this.cardWidth, left: left * this.cardWidth})
            this.node.show();
        }
        return this;
    },

    rotate: function (quarts) {
        if (quarts < 0 || quarts > 3) {
            throw "Quarts as an illegal value: " + quarts
        }
        this.rotation = quarts;
        if (this.animateDom) {
            this.node.css('transform', 'rotate(' + quarts * 90 + 'deg)');
        }
        return this;
    },

    remove: function () {
        this.top = null;
        this.left = null;
        if (this.animateDom) {
            this.setOnStack();
        }
        return this;
    },

    isPlaced: function () {
        return this.top !== null;
    }
};
