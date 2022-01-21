export async function penhack(ns, server) {
	let openPorts = 0;

	if (ns.fileExists('BruteSSH.exe')) { ns.brutessh(server); openPorts++; }
	if (ns.fileExists('FTPCrack.exe')) { ns.ftpcrack(server); openPorts++; }
	if (ns.fileExists('RelaySMTP.exe')) { ns.relaysmtp(server); openPorts++; }
	if (ns.fileExists('HTTPWorm.exe')) { ns.httpworm(server); openPorts++; }
	if (ns.fileExists('SQLInject.exe')) { ns.sqlinject(server); openPorts++; }

	const requiredPorts = ns.getServerNumPortsRequired(server);
	const requiredLevel = ns.getServerRequiredHackingLevel(server);
	const currentLevel = ns.getHackingLevel();

	if (requiredPorts <= openPorts && requiredLevel <= currentLevel && ns.nuke(server)) {
		ns.tprint(`NUKED ${server}`);
	}
}

/* Manual use */
export async function main(ns) {
	const [server] = ns.args;
	penhack(ns, server);
}