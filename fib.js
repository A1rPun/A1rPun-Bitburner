export async function main(ns) {
	const [server] = ns.args;

	let moneyThresh = ns.getServerMaxMoney(server) * 0.75;
	let securityThresh = ns.getServerMinSecurityLevel(server) + 5;

	while (true) {
		if (ns.getServerSecurityLevel(server) > securityThresh) {
			await ns.weaken(server);
		} else if (ns.getServerMoneyAvailable(server) < moneyThresh) {
			await ns.grow(server);
		} else {
			await ns.hack(server);
		}
	}
}