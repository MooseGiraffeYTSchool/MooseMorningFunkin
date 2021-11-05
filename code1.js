gdjs.IntroCode = {};
gdjs.IntroCode.GDiconsObjects1= [];
gdjs.IntroCode.GDiconsObjects2= [];
gdjs.IntroCode.GDNewObjectObjects1= [];
gdjs.IntroCode.GDNewObjectObjects2= [];
gdjs.IntroCode.GDNewObject2Objects1= [];
gdjs.IntroCode.GDNewObject2Objects2= [];
gdjs.IntroCode.GDbomObjects1= [];
gdjs.IntroCode.GDbomObjects2= [];
gdjs.IntroCode.GDNewObject3Objects1= [];
gdjs.IntroCode.GDNewObject3Objects2= [];
gdjs.IntroCode.GDNewObject4Objects1= [];
gdjs.IntroCode.GDNewObject4Objects2= [];

gdjs.IntroCode.conditionTrue_0 = {val:false};
gdjs.IntroCode.condition0IsTrue_0 = {val:false};
gdjs.IntroCode.condition1IsTrue_0 = {val:false};


gdjs.IntroCode.eventsList0 = function(runtimeScene) {

{


gdjs.IntroCode.condition0IsTrue_0.val = false;
{
gdjs.IntroCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
}if (gdjs.IntroCode.condition0IsTrue_0.val) {
{gdjs.evtTools.runtimeScene.setBackgroundColor(runtimeScene, "5;0;0");
}{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "iconchange");
}}

}


{


gdjs.IntroCode.condition0IsTrue_0.val = false;
{
gdjs.IntroCode.condition0IsTrue_0.val = gdjs.evtTools.input.anyKeyPressed(runtimeScene);
}if (gdjs.IntroCode.condition0IsTrue_0.val) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "PlayState", false);
}}

}


{


gdjs.IntroCode.condition0IsTrue_0.val = false;
{
gdjs.IntroCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.timerElapsedTime(runtimeScene, 1, "iconchange");
}if (gdjs.IntroCode.condition0IsTrue_0.val) {
gdjs.copyArray(runtimeScene.getObjects("icons"), gdjs.IntroCode.GDiconsObjects1);
{for(var i = 0, len = gdjs.IntroCode.GDiconsObjects1.length ;i < len;++i) {
    gdjs.IntroCode.GDiconsObjects1[i].setAnimationName("");
}
}}

}


};

gdjs.IntroCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.IntroCode.GDiconsObjects1.length = 0;
gdjs.IntroCode.GDiconsObjects2.length = 0;
gdjs.IntroCode.GDNewObjectObjects1.length = 0;
gdjs.IntroCode.GDNewObjectObjects2.length = 0;
gdjs.IntroCode.GDNewObject2Objects1.length = 0;
gdjs.IntroCode.GDNewObject2Objects2.length = 0;
gdjs.IntroCode.GDbomObjects1.length = 0;
gdjs.IntroCode.GDbomObjects2.length = 0;
gdjs.IntroCode.GDNewObject3Objects1.length = 0;
gdjs.IntroCode.GDNewObject3Objects2.length = 0;
gdjs.IntroCode.GDNewObject4Objects1.length = 0;
gdjs.IntroCode.GDNewObject4Objects2.length = 0;

gdjs.IntroCode.eventsList0(runtimeScene);
return;

}

gdjs['IntroCode'] = gdjs.IntroCode;
