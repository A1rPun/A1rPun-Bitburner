import { penhack } from 'penhack.js';
import { infoSec } from './infosec.js';

const attackScript = 'fib.js';

export async function main(ns) {
	const servers = await infoSec(ns);

	for (const server of servers) {
		if (server.name === 'home') continue;

		ns.killall(server.name);

		if (!ns.fileExists(attackScript, server.name)) await ns.scp(attackScript, server.name);

		if (!ns.hasRootAccess(server.name)) await penhack(ns, server.name);

		if (ns.hasRootAccess(server.name)) await attack(ns, server);
	}
}

export async function attack(ns, server) {
	const ramAvailable = server.maxRam - server.usedRam;
	const ramPerThread = ns.getScriptRam(attackScript);
	const threads = Math.floor(ramAvailable / ramPerThread);

	if (threads) {
		await ns.exec(attackScript, server.name, threads, server.name);
		ns.tprint(`Attack ${server.name} in progress`);
	} else {
		ns.tprint(`No RAM available on ${server.name}. Has ${ramAvailable}, need ${ramPerThread}`);
	}
}