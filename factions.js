import { getServers } from './util/servers.js';
import { hop } from './util/hop.js';

const backDoorServers = ['CSEC', 'avmnite-02h', 'I.I.I.I', 'run4theh111z', 'powerhouse-fitness'];

export function findRoutes(ns) {
	const servers = getServers(ns);

	for (const backDoorServer of backDoorServers) {
		const server = servers.find(x => x.name === backDoorServer);

		if (!server) continue;

		ns.tprint(`For server: ${server.name}`);
		ns.tprint(`${hop(server)}; backdoor`);
	}
}

export function canRunFl1ght(ns) {
	return ns.getHackingLevel() >= 2500 &&
		ns.getOwnedAugmentations() >= 30 &&
		ns.getServerMoneyAvailable('home') >= 1_000_000_000_000;
}

export async function main(ns) {
	findRoutes(ns);

	// for (const server of backDoorServers) {
	// 	ns.installBackdoor(server);
	// }
}