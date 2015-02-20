/**
 * Player which controls the replay procedure
 */
Player = function (replaystore, playground, cards, onStep) {
    this.replaystore = replaystore;
    this.playground = playground;
    this.cards = cards;
    this.onStep = onStep;
    this.reset();
}

Player.prototype = {

    replaystore: null,
    running: false,
    timer: null,

    startStop: function() {
        if (this.running) {
            this.stop();
        } else {
            this.start();
        }
    },

    start: function () {
        this.running = true;
        if (this.timer === null) {
            this.playStep();
        }
    },

    stop: function () {
        clearTimeout(this.timer);
        this.timer = null;
        this.running = false;
    },

    reset: function () {
        this.timer = null;
        this.playground.reset();
        $.each(this.cards, function (index, card) {
            card.reset();
            card.animateDom = true;
        });
        this.replaystore.stepCounter = 0;
        this.onStep(this.replaystore.stepCounter);
    },

    setSpeed: function (speed) {
        this.speed = speed
    },

    playStep: function () {
        this.replaystore.playStep();
        var that = this;
        if (this.running && !this.replaystore.done()) {
            this.onStep(this.replaystore.stepCounter);
            this.timer = setTimeout(function () {
                    that.playStep();
                },
                500 / this.speed)
        }
    }
}
