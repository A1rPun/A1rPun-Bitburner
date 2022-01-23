import { getServers } from './util/servers.js';

export function hop(server) {
	return server.trace.map(x => `connect ${x}`).join('; ');
}

export async function main(ns) {
	const [host] = ns.args;
	const servers = getServers(ns);
	const server = servers.find(x => x.name === host);

	ns.tprint(hop(server));

	// for (const hop in server.trace) {
	// 	ns.connect(hop);
	// 	ns.tprint(`Hopped to ${hop}`);
	// }
}