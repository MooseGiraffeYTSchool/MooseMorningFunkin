var gdjs;
(function(gdjs2) {
  gdjs2.gdevelopLogo = "data:image/png;base64,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";
})(gdjs || (gdjs = {}));
//# sourceMappingURL=gd-logo-light-colored.js.map
