import { infoSec } from './infosec.js';

export async function main(ns) {
    const [serverName] = ns.args;
    const servers = await infoSec(ns);
    const server = servers.find(x => x.name === serverName);

    ns.tprint(server.trace.join(' -> '));

    // for (const hop in server.trace) {
    //     ns.connect(hop);
    //     ns.tprint(`Hopped to ${hop}`);
    // }
}