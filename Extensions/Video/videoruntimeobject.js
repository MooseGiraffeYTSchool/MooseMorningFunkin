var gdjs;
(function(gdjs2) {
  class VideoRuntimeObject extends gdjs2.RuntimeObject {
    constructor(runtimeScene, videoObjectData) {
      super(runtimeScene, videoObjectData);
      this._pausedAsScenePaused = false;
      this._opacity = videoObjectData.content.opacity;
      this._loop = videoObjectData.content.loop;
      this._volume = videoObjectData.content.volume;
      this._videoResource = videoObjectData.content.videoResource;
      this._renderer = new gdjs2.VideoRuntimeObjectRenderer(this, runtimeScene);
      this.onCreated();
    }
    getRendererObject() {
      return this._renderer.getRendererObject();
    }
    updateFromObjectData(oldObjectData, newObjectData) {
      if (oldObjectData.content.opacity !== newObjectData.content.opacity) {
        this.setOpacity(newObjectData.content.opacity);
      }
      if (oldObjectData.content.loop !== newObjectData.content.loop) {
        this.setLoop(newObjectData.content.loop);
      }
      if (oldObjectData.content.volume !== newObjectData.content.volume) {
        this.setVolume(newObjectData.content.volume);
      }
      if (oldObjectData.content.videoResource !== newObjectData.content.videoResource) {
        return false;
      }
      return true;
    }
    extraInitializationFromInitialInstance(initialInstanceData) {
      if (initialInstanceData.customSize) {
        this.setWidth(initialInstanceData.width);
        this.setHeight(initialInstanceData.height);
      }
    }
    onDestroyFromScene(runtimeScene) {
      super.onDestroyFromScene(runtimeScene);
      this._renderer.onDestroy();
    }
    update(runtimeScene) {
      this._renderer.ensureUpToDate();
    }
    setX(x) {
      super.setX(x);
      this._renderer.updatePosition();
    }
    setY(y) {
      super.setY(y);
      this._renderer.updatePosition();
    }
    setAngle(angle) {
      super.setAngle(angle);
      this._renderer.updateAngle();
    }
    setOpacity(opacity) {
      this._opacity = opacity;
      this._renderer.updateOpacity();
    }
    getOpacity() {
      return this._opacity;
    }
    setWidth(width) {
      if (this._renderer.getWidth() === width)
        return;
      this._renderer.setWidth(width);
      this.hitBoxesDirty = true;
    }
    setHeight(height) {
      if (this._renderer.getHeight() === height)
        return;
      this._renderer.setHeight(height);
      this.hitBoxesDirty = true;
    }
    getWidth() {
      return this._renderer.getWidth();
    }
    getHeight() {
      return this._renderer.getHeight();
    }
    play() {
      this._renderer.play();
    }
    pause() {
      this._renderer.pause();
    }
    setLoop(enable) {
      this._renderer.setLoop(enable);
    }
    mute(enable) {
      this._renderer.setMute(enable);
    }
    isMuted() {
      return this._renderer.isMuted();
    }
    setVolume(volume) {
      this._volume = gdjs2.evtTools.common.clamp(gdjs2.evtTools.common.normalize(volume, 0, 100), 0, 1) * 100;
      this._renderer.updateVolume();
    }
    getVolume() {
      return gdjs2.evtTools.common.normalize(this._renderer.getVolume(), 0, 1) * 100;
    }
    isPlayed() {
      return this._renderer.isPlayed();
    }
    isPaused() {
      return !this._renderer.isPlayed();
    }
    isLooped() {
      return this._renderer.isLooped();
    }
    getDuration() {
      return this._renderer.getDuration();
    }
    isEnded() {
      return this._renderer.isEnded();
    }
    setCurrentTime(time) {
      this._renderer.setCurrentTime(time);
    }
    getCurrentTime() {
      return this._renderer.getCurrentTime();
    }
    setPlaybackSpeed(playbackSpeed) {
      this._playbackSpeed = gdjs2.evtTools.common.clamp(playbackSpeed, 0.5, 2);
      this._renderer.setPlaybackSpeed(this._playbackSpeed);
    }
    getPlaybackSpeed() {
      return this._renderer.getPlaybackSpeed();
    }
  }
  gdjs2.VideoRuntimeObject = VideoRuntimeObject;
  gdjs2.registerObject("Video::VideoObject", gdjs2.VideoRuntimeObject);
  gdjs2.registerRuntimeSceneUnloadedCallback(function(runtimeScene) {
    const instances = runtimeScene.getAdhocListOfAllInstances();
    for (let i = 0; i < instances.length; ++i) {
      const obj = instances[i];
      if (obj instanceof gdjs2.VideoRuntimeObject) {
        if (obj.isPlayed()) {
          obj.pause();
        }
      }
    }
  });
  gdjs2.registerRuntimeScenePausedCallback(function(runtimeScene) {
    const instances = runtimeScene.getAdhocListOfAllInstances();
    for (let i = 0; i < instances.length; ++i) {
      const obj = instances[i];
      if (obj instanceof gdjs2.VideoRuntimeObject) {
        if (obj.isPlayed()) {
          obj.pause();
          obj._pausedAsScenePaused = true;
        }
      }
    }
  });
  gdjs2.registerRuntimeSceneResumedCallback(function(runtimeScene) {
    const instances = runtimeScene.getAdhocListOfAllInstances();
    for (let i = 0; i < instances.length; ++i) {
      const obj = instances[i];
      if (obj instanceof gdjs2.VideoRuntimeObject) {
        if (obj._pausedAsScenePaused) {
          obj.play();
        }
      }
    }
  });
})(gdjs || (gdjs = {}));
//# sourceMappingURL=videoruntimeobject.js.map
