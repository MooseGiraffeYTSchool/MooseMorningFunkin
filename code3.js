gdjs.LoseCode = {};
gdjs.LoseCode.GDiconsObjects1= [];
gdjs.LoseCode.GDiconsObjects2= [];
gdjs.LoseCode.GDNewObjectObjects1= [];
gdjs.LoseCode.GDNewObjectObjects2= [];
gdjs.LoseCode.GDNewObject2Objects1= [];
gdjs.LoseCode.GDNewObject2Objects2= [];
gdjs.LoseCode.GDNewObject3Objects1= [];
gdjs.LoseCode.GDNewObject3Objects2= [];

gdjs.LoseCode.conditionTrue_0 = {val:false};
gdjs.LoseCode.condition0IsTrue_0 = {val:false};
gdjs.LoseCode.condition1IsTrue_0 = {val:false};


gdjs.LoseCode.eventsList0 = function(runtimeScene) {

{


{
{gdjs.evtTools.runtimeScene.setBackgroundColor(runtimeScene, "0;0;0");
}}

}


{


gdjs.LoseCode.condition0IsTrue_0.val = false;
{
gdjs.LoseCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
}if (gdjs.LoseCode.condition0IsTrue_0.val) {
{gdjs.evtTools.sound.playMusicOnChannel(runtimeScene, "gameOver.ogg", 1, false, 100, 1);
}}

}


{


gdjs.LoseCode.condition0IsTrue_0.val = false;
{
gdjs.LoseCode.condition0IsTrue_0.val = gdjs.evtTools.input.isKeyPressed(runtimeScene, "Return");
}if (gdjs.LoseCode.condition0IsTrue_0.val) {
{gdjs.evtTools.sound.stopMusicOnChannel(runtimeScene, 1);
}{gdjs.evtTools.sound.playSound(runtimeScene, "gameOverEnd.ogg", false, 100, 1);
}{gdjs.evtTools.runtimeScene.popScene(runtimeScene);
}}

}


};

gdjs.LoseCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.LoseCode.GDiconsObjects1.length = 0;
gdjs.LoseCode.GDiconsObjects2.length = 0;
gdjs.LoseCode.GDNewObjectObjects1.length = 0;
gdjs.LoseCode.GDNewObjectObjects2.length = 0;
gdjs.LoseCode.GDNewObject2Objects1.length = 0;
gdjs.LoseCode.GDNewObject2Objects2.length = 0;
gdjs.LoseCode.GDNewObject3Objects1.length = 0;
gdjs.LoseCode.GDNewObject3Objects2.length = 0;

gdjs.LoseCode.eventsList0(runtimeScene);
return;

}

gdjs['LoseCode'] = gdjs.LoseCode;
