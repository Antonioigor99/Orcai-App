const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Ajustes para Firebase funcionar corretamente com Metro bundler
config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = false;
module.exports = withNativeWind(config, { input: "./src/styles/global.css" });
