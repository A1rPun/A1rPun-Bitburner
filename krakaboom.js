import { penhack } from 'penhack.js';
import { getServers } from './util/servers.js';

const attackScript = 'fib.js';

export async function krakaboom(ns) {
	const servers = getServers(ns);

	for (const server of servers) {
		if (server.name === 'home') continue;

		if (!ns.fileExists(attackScript, server.name)) await ns.scp(attackScript, server.name);

		if (!ns.hasRootAccess(server.name)) await penhack(ns, server.name);

		if (ns.hasRootAccess(server.name)) await attack(ns, server);
	}
}

export async function attack(ns, server) {
	const ramAvailable = server.maxRam - ns.getServerUsedRam(server.name);
	const ramPerThread = ns.getScriptRam(attackScript);
	const threads = Math.floor(ramAvailable / ramPerThread);

	if (!threads) return;

	await ns.exec(attackScript, server.name, threads, server.name);
	ns.print(`Attack ${server.name} in progress`);
}

export async function main(ns) {
	ns.disableLog('ALL');
	ns.print('Invoke krakaboom');

	while (true) {
		await krakaboom(ns);
		await ns.sleep(60_000);
	}
}