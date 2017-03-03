let painter = {
    canvasId: "Gwanghwamun",
    backgroundSrc: "res/looping_background.jpg",
    spriteSrc: "res/candle_sprite.png",
    sprites: [],
    spriteWidth: 20,
    spriteHeight: 20,
    numberOfSprites: 9,

    getCanvasSize: function (rect) {

        this.width = rect.width;
        this.height = rect.height;
    },

    scrollBackground: function (scrollAmount) {

        this.backgroundY += scrollAmount;

        if (this.backgroundY > this.height * 2) {
            this.backgroundY = 0;
        }
    },

    scrollSprite: function (sprite, scrollAmount) {

        sprite.positionY += scrollAmount * sprite.velocityScale;

        if (sprite.positionY > this.height) {
            sprite.positionY = this.spriteWidth * 3 * (Math.random() - 1);
        }
    },

    createBackgroundImage: function () {

        let backgroundImage = new Image();
        backgroundImage.src = this.backgroundSrc;
        backgroundImage.style.height = this.height;
        backgroundImage.style.zIndex = 0;

        return backgroundImage;
    },

    createSpriteImage: function () {

        let spriteImage = new Image();
        spriteImage.src = this.spriteSrc;
        spriteImage.style.zIndex = 1;

        return spriteImage;
    },

    initialize: function () {

        this.field = document.getElementById(this.canvasId);

        if (!this.field.getContext("2d")) {
            return;
        }
        this.context = this.field.getContext("2d");

        this.getCanvasSize(this.field);

        this.backgroundY = 0;

        this.initSprites();

        // console.log("init");
    },

    initSprites: function () {

        for (let i = 0; i < this.numberOfSprites; i++) {
            let spriteBorn = {
                positionX: this.width * Math.random(),
                positionY: this.spriteWidth * 3 * (Math.random() - 1),
                velocityScale: 0.5 + Math.random() * 1.5,
            };

            this.sprites.push(spriteBorn);
        }
    },

    draw: function (scrollAmount) {

        this.getCanvasSize(this.field);

        this.context.clearRect(0, 0, this.width, this.height);

        let backgroundImage = this.createBackgroundImage();

        this.context.drawImage(backgroundImage, 0, this.backgroundY, this.width, this.height);
        this.context.drawImage(backgroundImage, 0, this.backgroundY - this.height, this.width, this.height);
        this.context.drawImage(backgroundImage, 0, this.backgroundY - 2 * this.height, this.width, this.height);

        this.scrollBackground(scrollAmount);

        let spriteImage;
        for (let i = 0; i < this.numberOfSprites; i++) {

            spriteImage = this.createSpriteImage();
            this.context.drawImage(spriteImage, this.sprites[i].positionX, this.sprites[i].positionY, this.spriteWidth, this.spriteHeight);

            this.scrollSprite(this.sprites[i], scrollAmount);
        }

        // console.log("painter Y: " + this.backgroundY);
    }
};

window.onload = painter.initialize();
setInterval((() => painter.draw(1)), 1000 / 60);

