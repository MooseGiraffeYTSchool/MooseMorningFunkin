var gdjs;
(function(gdjs2) {
  const PIXI = GlobalPIXIModule.PIXI;
  class LayerPixiRenderer {
    constructor(layer, runtimeSceneRenderer) {
      this._renderTexture = null;
      this._lightingSprite = null;
      this._oldWidth = null;
      this._oldHeight = null;
      this._pixiContainer = new PIXI.Container();
      this._layer = layer;
      this._runtimeSceneRenderer = runtimeSceneRenderer;
      this._pixiRenderer = runtimeSceneRenderer.getPIXIRenderer();
      this._isLightingLayer = layer.isLightingLayer();
      this._clearColor = layer.getClearColor();
      runtimeSceneRenderer.getPIXIContainer().addChild(this._pixiContainer);
      this._pixiContainer.filters = [];
      if (this._isLightingLayer) {
        this._replaceContainerWithSprite();
      }
    }
    getRendererObject() {
      return this._pixiContainer;
    }
    getLightingSprite() {
      return this._lightingSprite;
    }
    updatePosition() {
      const angle = -gdjs2.toRad(this._layer.getCameraRotation());
      const zoomFactor = this._layer.getCameraZoom();
      this._pixiContainer.rotation = angle;
      this._pixiContainer.scale.x = zoomFactor;
      this._pixiContainer.scale.y = zoomFactor;
      const cosValue = Math.cos(angle);
      const sinValue = Math.sin(angle);
      const centerX = this._layer.getCameraX() * zoomFactor * cosValue - this._layer.getCameraY() * zoomFactor * sinValue;
      const centerY = this._layer.getCameraX() * zoomFactor * sinValue + this._layer.getCameraY() * zoomFactor * cosValue;
      this._pixiContainer.position.x = -centerX;
      this._pixiContainer.position.y = -centerY;
      this._pixiContainer.position.x += this._layer.getWidth() / 2;
      this._pixiContainer.position.y += this._layer.getHeight() / 2;
    }
    updateVisibility(visible) {
      this._pixiContainer.visible = !!visible;
    }
    updatePreRender() {
      if (this._renderTexture) {
        this._updateRenderTexture();
      }
    }
    addRendererObject(child, zOrder) {
      child.zOrder = zOrder;
      for (let i = 0, len = this._pixiContainer.children.length; i < len; ++i) {
        if (this._pixiContainer.children[i].zOrder >= zOrder) {
          this._pixiContainer.addChildAt(child, i);
          return;
        }
      }
      this._pixiContainer.addChild(child);
    }
    changeRendererObjectZOrder(child, newZOrder) {
      this._pixiContainer.removeChild(child);
      this.addRendererObject(child, newZOrder);
    }
    removeRendererObject(child) {
      this._pixiContainer.removeChild(child);
    }
    updateClearColor() {
      this._clearColor = this._layer.getClearColor();
      this._updateRenderTexture();
    }
    _updateRenderTexture() {
      if (!this._pixiRenderer || this._pixiRenderer.type !== PIXI.RENDERER_TYPE.WEBGL) {
        return;
      }
      if (!this._renderTexture) {
        this._oldWidth = this._pixiRenderer.screen.width;
        this._oldHeight = this._pixiRenderer.screen.height;
        const width = this._oldWidth;
        const height = this._oldHeight;
        const resolution = this._pixiRenderer.resolution;
        this._renderTexture = PIXI.RenderTexture.create({
          width,
          height,
          resolution
        });
        this._renderTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
      }
      if (this._oldWidth !== this._pixiRenderer.screen.width || this._oldHeight !== this._pixiRenderer.screen.height) {
        this._renderTexture.resize(this._pixiRenderer.screen.width, this._pixiRenderer.screen.height);
        this._oldWidth = this._pixiRenderer.screen.width;
        this._oldHeight = this._pixiRenderer.screen.height;
      }
      const oldRenderTexture = this._pixiRenderer.renderTexture.current;
      const oldSourceFrame = this._pixiRenderer.renderTexture.sourceFrame;
      this._pixiRenderer.renderTexture.bind(this._renderTexture);
      this._pixiRenderer.renderTexture.clear(this._clearColor);
      this._pixiRenderer.render(this._pixiContainer, this._renderTexture, false);
      this._pixiRenderer.renderTexture.bind(oldRenderTexture, oldSourceFrame, void 0);
    }
    _replaceContainerWithSprite() {
      if (!this._pixiRenderer || this._pixiRenderer.type !== PIXI.RENDERER_TYPE.WEBGL) {
        return;
      }
      this._updateRenderTexture();
      if (!this._renderTexture) {
        return;
      }
      this._lightingSprite = new PIXI.Sprite(this._renderTexture);
      this._lightingSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY;
      const sceneContainer = this._runtimeSceneRenderer.getPIXIContainer();
      const index = sceneContainer.getChildIndex(this._pixiContainer);
      sceneContainer.addChildAt(this._lightingSprite, index);
      sceneContainer.removeChild(this._pixiContainer);
    }
  }
  gdjs2.LayerPixiRenderer = LayerPixiRenderer;
  gdjs2.LayerRenderer = gdjs2.LayerPixiRenderer;
})(gdjs || (gdjs = {}));
//# sourceMappingURL=layer-pixi-renderer.js.map
