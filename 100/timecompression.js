export async function main(ns) {
    let time = 0;
    Date.prototype.getTime = () => time++;
}