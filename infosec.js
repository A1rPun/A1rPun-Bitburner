export async function infoSec(ns) {
	const lookup = new Set()
	const servers = [];
	const getAllServers = (parent = 'home', trace = []) => {
		lookup.add(parent);

		for (const server of ns.scan(parent)) {
			if (!lookup.has(server)) {
				const maxRam = ns.getServerMaxRam(server);
				const usedRam = ns.getServerUsedRam(server);
				const requiredPorts = ns.getServerNumPortsRequired(server);
				const requiredLevel = ns.getServerRequiredHackingLevel(server);
				const money = ns.getServerMoneyAvailable(server);
				const maxMoney = ns.getServerMaxMoney(server);
				const newTrace = [...trace, server];
				servers.push({ requiredLevel, requiredPorts, maxRam, usedRam, money, maxMoney, trace: newTrace, name: server });
				getAllServers(server, newTrace);
			}
		}
	};

	getAllServers();
	return servers;
}

export async function main(ns) {
	const servers = await infoSec(ns);
	const info = servers
		.sort((a, b) => a.requiredLevel < b.requiredLevel ? -1 : 1)
		.map(x => `Level:${x.requiredLevel} - Ports:${x.requiredPorts} - RAM:${x.maxRam} - Hops:${x.trace.length} - Money:${x.maxMoney / x.money}% - ${x.name}`)
		.join('\n');

	ns.tprint(info);
}