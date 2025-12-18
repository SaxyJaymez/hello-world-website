module.exports = function(eleventyConfig) {
  eleventyConfig.addCollection("post", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/**/*.md");
  });

  // Return your Object options:
  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  }
};