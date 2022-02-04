// helper functions on hexo-render-handlebars
// https://www.npmjs.com/package/hexo-renderer-handlebars

//===========================================================================
// helpers for helpers

function makeTableForArchives(posts, isMonthly, dateFormat, dirPrefix) {
    const fmtForPath = isMonthly ? 'YYYY/MM' : 'YYYY';
    const func = (acc, post) => {
        const date = post.date;
        const label = date.format(dateFormat);
        const path = dirPrefix + '/' + date.format(fmtForPath) + '/';
        if (!acc[label]) acc[label] = {label, path, date, posts: []}; // "date" is a representative value
        acc[label].posts.push(post);
        return acc;
    };
    const table = Array.prototype.reduce.apply(posts, [func, {}]);
    Object.values(table).forEach(x => x.count = 0 + x.posts.length);
    return table;
}

//===========================================================================
// helpers

function getLinksForArchives(posts, isMonthly, dateFormat, dirPrefix) {
    const table = makeTableForArchives(posts, isMonthly, dateFormat, dirPrefix);
    const list = Object.values(table);
    list.sort((a, b) => b.date - a.date);
    return list;
}

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
        getLinksForArchives,
        getRecentPosts,
        lt,
    };
};