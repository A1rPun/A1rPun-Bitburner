export function getServer(ns, host) {
	const rootAccess = ns.hasRootAccess(host);
	const maxRam = ns.getServerMaxRam(host);
	const usedRam = ns.getServerUsedRam(host);
	const requiredPorts = ns.getServerNumPortsRequired(host);
	const requiredLevel = ns.getServerRequiredHackingLevel(host);
	const money = ns.getServerMoneyAvailable(host);
	const maxMoney = ns.getServerMaxMoney(host);
	const securityLevel = ns.getServerSecurityLevel(host);
	const minSecurityLevel = ns.getServerMinSecurityLevel(host);

	return {
		name: host, rootAccess,
		requiredLevel, requiredPorts,
		maxRam, usedRam,
		money, maxMoney,
		securityLevel, minSecurityLevel
	};
}

export async function main(ns) {
	const [host] = ns.args;
	const server = getServer(ns, host ?? 'home');

	ns.tprint(server);
}