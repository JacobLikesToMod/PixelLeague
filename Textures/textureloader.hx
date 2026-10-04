package;

import openfl.display.Sprite;
import openfl.display.Bitmap;
import openfl.display.BitmapData;
import openfl.Assets;

class Main extends Sprite {
    
    public function new() {
        super();
        
        // METHOD A: Load from pre-configured Assets folder (Synchronous)
        // Ensure "assets/my_texture.png" is declared in your project.xml file
        var textureData:BitmapData = Assets.getBitmapData("assets/my_texture.png");
        var spriteVisual = new Bitmap(textureData);
        addChild(spriteVisual);
        
        // METHOD B: Load from local file path or URL (Asynchronous)
        BitmapData.loadFromFile("my_texture.png").onComplete(function(bitmapData:BitmapData) {
            var asynchronousSprite = new Bitmap(bitmapData);
            asynchronousSprite.x = 200; // Shift it over
            addChild(asynchronousSprite);
        }).onFailed(function(error) {
            trace("Failed to load texture: " + error);
        });
    }
}
