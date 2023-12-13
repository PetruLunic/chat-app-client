const path = require("path");

module.exports = {
    webpack: {
        alias: {
            "@hooks": path.resolve(__dirname, "src/hooks/"),
            "@services": path.resolve(__dirname, "src/services/"),
            "@components": path.resolve(__dirname, "src/components/"),
            "@src": path.resolve(__dirname, "src/"),
            "@types": path.resolve(__dirname, "src/types.ts"),
            "@helpers": path.resolve(__dirname, "src/helpers/"),
            "@store": path.resolve(__dirname, "src/store/"),
        }
    },
}