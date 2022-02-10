// helper functions on hexo-render-handlebars
// https://www.npmjs.com/package/hexo-renderer-handlebars

//===========================================================================
// helpers for helpers

function makeListForArchives(posts, isMonthly, dateFormat, dirPrefix) {
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
    const list = Object.values(table);
    list.forEach(x => x.count = x.posts.length);
    list.forEach(x => x.posts.sort((a, b) => b.date - a.date));
    list.sort((a, b) => b.date - a.date);
    return list;
}

//===========================================================================
// helpers

function date(obj, fmt) {
    // https://momentjs.com/
    return obj.format(fmt);
}

function getCopyrightYear(posts) {
    const list = posts.map(post => post.date.format('YYYY')).map(Number);
    list.push((new Date()).getFullYear());
    list.sort((a, b) => a - b);
    const start = list[0];
    const last = list.pop();
    if (last && last !== start) return `${start}-${last}`;
    return `${start}`;
}

function getLinksForArchives(posts, isMonthly, dateFormat, dirPrefix) {
    const list = makeListForArchives(posts, isMonthly, dateFormat, dirPrefix);
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

function now() {
    return Date.now();
}

module.exports = (hexo) => {
    return {
        date,
        getCopyrightYear,
        getLinksForArchives,
        getRecentPosts,
        lt,
        now,
    };
};
