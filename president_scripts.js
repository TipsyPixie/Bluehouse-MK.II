let canvasControl = {
    canvasId: "Gwanghwamun",
    backgroundSrc: "res/looping_background.jpg",
    spriteSrc: "res/candle_sprite.gif",
    sprites: [],
    numberOfSprites: 7,

    getCanvasSize: function(rect) {

        this.width = rect.width;
        this.height = rect.height;
    },

    scrollBackground: function(scrollAmount) {

        this.backgroundY = this.backgroundY + scrollAmount;

        if(this.backgroundY > this.height * 2){
            this.backgroundY = 0;
        }
    },

    scrollSprite: function(sprite) {

        sprite.positionY = sprite.positionY +
    },

    createBackgroundImage: function() {

        let backgroundImage = new Image();
        backgroundImage.src = this.backgroundSrc;
        backgroundImage.style.height = this.height;
        backgroundImage.style.zIndex = 0;

        return backgroundImage;
    },

    createSpriteImage: function() {

        let spriteImage = new Image();
        spriteImage.src = this.spriteSrc;
        spriteImage.style.zIndex = 1;

        return spriteImage;
    },

    initialize: function() {

        this.field = document.getElementById(this.canvasId);

        if(!this.field.getContext("2d")){
            return;
        }
        this.context = this.field.getContext("2d");

        this.getCanvasSize(this.field);
        this.backgroundY = 0;

        this.initSprites();

        // console.log("init");
    },

    initSprites: function() {

        for(let i = 0; i < this.numberOfSprites; i++){
            let spriteBorn = {
                positionX: Math.random() * this.width,
                positionY: Math.random() * - 10 + this.height,
                velocity: Math.random() * 2
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

        console.log("canvasControl Y: " + this.backgroundY);
    }
};

window.onload = canvasControl.initialize();

const frameInterval = 1000 / 60;
setInterval((() => canvasControl.draw(1)), frameInterval);