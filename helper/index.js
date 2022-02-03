// helper functions on hexo-render-handlebars
// https://www.npmjs.com/package/hexo-renderer-handlebars

function getRecentPosts(posts, num) {
    const list = [].concat(posts); // copy
    list.sort((a, b) => b.date - a.date);
    return list.slice(0, num);
}

function lt(arg1, arg2) {
    return arg1 < arg2;
}

module.exports = (hexo) => {
    return {
        getRecentPosts,
        lt,
    };
};
