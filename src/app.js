
var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    size:null,
    score:null,
    bombs: [],
    carrots: [],
    random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    //bombs
   createBomb: function(){
       
       
       
 		var bomb = new cc.Sprite(res.bomba_png);
         var xPos = this.random(275,690);
         bomb.setPosition(xPos, 800);
         this.addChild(bomb, 1);
 		var moveto = cc.moveTo(this.random(2,5), xPos, 60);
 		bomb.runAction(moveto);
 		this.bombs.push(bomb);
         var rectBomb = bomb.getBoundingBox();
 	},
    //zanahorias 
    createCarrot: function(){
        
        
        
 		var carrot = new cc.Sprite(res.carrot_png);
         var xPos = this.random(280,700);
         carrot.setPosition(xPos, 800);
         this.addChild(carrot, 1);
 		var moveto = cc.moveTo(this.random(2,5), xPos, 70);
 		carrot.runAction(moveto);
 		this.carrots.push(carrot);		
    },
    //colision
    collide: function(){
        
        
        
        
 		for(var kaboms of this.bombs){
 			var box=kaboms.getBoundingBox();
 			var bunny=this.sprConejo.getBoundingBox();
 			if(cc.rectIntersectsRect(bunny, box)){
 				kaboms.setVisible(false);
 				kaboms.setPosition(0,0);
 				this.score=0;
 				alert("Game over, nerd");
 			}
 		}
 		return true;
 	},
   win:function(){
       
       
 		for(var carrot of this.carrots){
 			var box=carrot.getBoundingBox();
 			var bunny=this.sprConejo.getBoundingBox();
 			if(cc.rectIntersectsRect(bunny, carrot)){
 				carrot.setVisible(false);
 			carrot.setPosition(0,0);
 			this.score++;
 			alert("New score: "+ this.score);
		}
 	}
 		return true;
		
 },	
    //movimiento
    movement: function(location, event){
		
		cc.log("MUEVETE");
 		var  juego = event.getCurrentTarget();
 		var ubicacion = location.getLocation();
 		juego.sprConejo.setPosition(ubicacion.x,ubicacion.y);
 	},
    
    //scoreboard
    score: function(){
 	for(var carrot of this.carrots){
             var rectCarrot = carrot.getBoundingBox();
            var rectBunny = this.sprConejo.getBoundingBox();
            
             if(cc.rectIntersectsRect(rectCarrot, rectBunny)){
                 carrot.setVisible(false);
                carrot.setPosition(0,0);
                 this.scoreValue += 1;
                 this.scoreLabel.setString("Score: " + this.scoreValue);
             }
             
             if(carrot.getPositionY() < 60){
                 carrot.setVisible(false);
                 carrot.setPosition(0,0);
             }
        this.scoreLabel = new cc.LabelTTF("Score: " + this.scoreValue, "ComicSans", 20);
        this.scoreLabel.setPosition(550, 520);
         this.scoreLabel.setColor(0, 0, 0);
        this.addChild(this.scoreLabel, 2);
 		}
 		return true;	
 	},
    ctor:function () {
        this._super();
        //Obteniendo el tamaño de la pantalla
        var size = cc.winSize;

        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0);
        
        //posicionando la imagen de fondo
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        this.addChild(this.sprConejo, 1);


        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

