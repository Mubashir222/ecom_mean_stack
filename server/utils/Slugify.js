const Slugify = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "") // Remove non-alphanumeric characters except spaces
        .replace(/\s+/g, "-"); // Replace spaces with dashes
};

module.exports = Slugify;
