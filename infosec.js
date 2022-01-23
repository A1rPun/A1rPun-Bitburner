import { getServer } from './util/server.js';
import { getServers } from './util/servers.js';

const b = (boolean) => boolean ? 'Yes' : 'No';
const canHack = (ns, server) => server.requiredLevel < ns.getHackingLevel();

function printServer(ns, host) {
	const server = getServer(ns, host);

	for (const key in server)
		ns.tprint(`${key}: ${server[key]}`);
}

function printAllServers(ns) {
	const servers = getServers(ns);
	const info = servers
		.sort((a, b) => a.requiredLevel - b.requiredLevel)
		.map(x => `Hacked: ${b(x.rootAccess)} - Hackable: ${b(canHack(ns, x))} - Distance: ${x.trace.length} - ${x.name}`)
		.join('\n');

	ns.tprint(`\n${info}`);
}

export async function main(ns) {
	const [host] = ns.args;

	ns.tprint('========== Security Info ==========');

	if (host)
		printServer(ns, host);
	else
		printAllServers(ns);
}