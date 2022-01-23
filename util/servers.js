import { getServer } from './util/server.js';

export function getServers(ns) {
	const lookup = new Set()
	const servers = [];
	const getAllServers = (parent = 'home', trace = []) => {
		lookup.add(parent);

		for (const host of ns.scan(parent)) {
			if (lookup.has(host)) continue;

			const server = getServer(ns, host);
			const newTrace = [...trace, host];
			servers.push({ ...server, trace: newTrace });
			getAllServers(host, newTrace);
		}
	};

	getAllServers();
	return servers;
}

export async function main(ns) {
	const servers = getServers(ns);
	const info = servers
		.sort((a, b) => a.requiredLevel - b.requiredLevel)
		.map(x => x.trace.join(' -> '))
		.join('\n');

	ns.tprint(info);
}