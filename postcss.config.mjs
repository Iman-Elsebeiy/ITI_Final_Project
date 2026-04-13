const fixTailwindMaskUrls = () => ({
  postcssPlugin: "postcss-fix-tailwind-mask-urls",
  Declaration(decl) {
    if (decl.prop === "mask-image" && decl.value === "url(...)") {
      decl.parent.remove();
    }
  },
});
fixTailwindMaskUrls.postcss = true;

export default {
  plugins: ["@tailwindcss/postcss", fixTailwindMaskUrls],
};
