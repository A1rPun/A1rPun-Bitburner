export async function main(ns) {
    const getProps = (obj) => Object.entries(obj).find(entry => entry[0]?.startsWith('__reactProps'))?.[1]?.children?.props;
    Array
        .from(eval('document').querySelectorAll('[class*=MuiBox-root]'))
        .map(x => getProps(x))
        .find(x => x?.player)
        .router
        .toDevMenu();
}