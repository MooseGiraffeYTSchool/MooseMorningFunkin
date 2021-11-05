var gdjs;
(function(gdjs2) {
  const PIXI = GlobalPIXIModule.PIXI;
  class VideoRuntimeObjectPixiRenderer {
    constructor(runtimeObject, runtimeScene) {
      this._textureWasValid = false;
      this._object = runtimeObject;
      this._pixiObject = new PIXI.Sprite(runtimeScene.getGame().getImageManager().getPIXIVideoTexture(this._object._videoResource));
      this._pixiObject._texture.baseTexture.resource.autoPlay = false;
      this._pixiObject._texture.baseTexture.resource.source.preload = "auto";
      this._pixiObject._texture.baseTexture.resource.source.autoload = true;
      runtimeScene.getLayer("").getRenderer().addRendererObject(this._pixiObject, runtimeObject.getZOrder());
      this._pixiObject.anchor.x = 0.5;
      this._pixiObject.anchor.y = 0.5;
      this.updatePosition();
      this.updateAngle();
      this.updateOpacity();
      this.updateVolume();
      this.updateLoop();
    }
    getRendererObject() {
      return this._pixiObject;
    }
    onDestroy() {
      this.pause();
    }
    ensureUpToDate() {
      if (!this._textureWasValid && this._pixiObject.texture && this._pixiObject.texture.valid) {
        this.updatePosition();
        this._textureWasValid = true;
      }
    }
    updatePosition() {
      this._pixiObject.position.x = this._object.x + this._pixiObject.width / 2;
      this._pixiObject.position.y = this._object.y + this._pixiObject.height / 2;
    }
    updateLoop() {
      this._pixiObject._texture.baseTexture.resource.source.loop = this._object._loop;
    }
    updateVolume() {
      this._pixiObject._texture.baseTexture.resource.source.volume = this._object._volume / 100;
    }
    updateAngle() {
      this._pixiObject.rotation = gdjs2.toRad(this._object.angle);
    }
    updateOpacity() {
      this._pixiObject.alpha = this._object._opacity / 255;
    }
    getWidth() {
      return this._pixiObject.width;
    }
    getHeight() {
      return this._pixiObject.height;
    }
    setWidth(width) {
      this._pixiObject.width = width;
      this.updatePosition();
    }
    setHeight(height) {
      this._pixiObject.height = height;
      this.updatePosition();
    }
    _getHTMLVideoElementSource() {
      if (!this._pixiObject.texture || !this._pixiObject.texture.baseTexture.resource.source) {
        return null;
      }
      const source = this._pixiObject.texture.baseTexture.resource.source;
      if (!(source instanceof HTMLVideoElement)) {
        return null;
      }
      return source;
    }
    play() {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return;
      }
      const promise = source.play();
      if (promise !== void 0) {
        promise.then(() => {
        }).catch(() => {
          console.warn("The video did not start because: video is invalid or no interaction with the game has been captured before (this is blocked by the navigator: https://goo.gl/xX8pDD)");
        });
      }
    }
    pause() {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return;
      }
      source.pause();
    }
    setLoop(enable) {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return;
      }
      source.loop = enable;
    }
    setMute(enable) {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return;
      }
      this._pixiObject._texture.baseTexture.resource.source.muted = enable;
    }
    isMuted() {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return false;
      }
      return source.muted;
    }
    setCurrentTime(number) {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return;
      }
      source.currentTime = number;
    }
    setVolume(volume) {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return;
      }
      source.volume = volume;
    }
    getVolume() {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return 0;
      }
      return source.volume;
    }
    isPlayed() {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return false;
      }
      return !source.paused && !source.ended;
    }
    isLooped() {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return false;
      }
      return source.loop;
    }
    getCurrentTime() {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return 0;
      }
      return source.currentTime;
    }
    getDuration() {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return 0;
      }
      return source.duration;
    }
    isEnded() {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return false;
      }
      return source.ended;
    }
    setPlaybackSpeed(playbackRate) {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return;
      }
      source.playbackRate = playbackRate;
    }
    getPlaybackSpeed() {
      const source = this._getHTMLVideoElementSource();
      if (!source) {
        return 0;
      }
      return source.playbackRate;
    }
  }
  gdjs2.VideoRuntimeObjectPixiRenderer = VideoRuntimeObjectPixiRenderer;
  gdjs2.VideoRuntimeObjectRenderer = VideoRuntimeObjectPixiRenderer;
})(gdjs || (gdjs = {}));
//# sourceMappingURL=videoruntimeobject-pixi-renderer.js.map
