require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: ["next/core-web-vitals", "next/typescript"],
  rules: {
    "@next/next/no-img-element": "off",
  },
};
