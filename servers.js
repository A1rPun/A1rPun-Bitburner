const serverNamePrefix = 'localhost';
const maxRam = 1024; // ns.getPurchasedServerMaxRam();
const limitMoney = 1_000_000;
const canBuy = (ns, n) => ns.getServerMoneyAvailable('home') - limitMoney >= n;

export async function main(ns) {
	const purchased = ns.getPurchasedServers();
	const serverlimit = ns.getPurchasedServerLimit();

	if (serverlimit < purchased.length) return;

	const amountOfServers = serverlimit - purchased.length;
	const cost = ns.getPurchasedServerCost(maxRam);

	for (let i = 0; i < amountOfServers; i++) {
		if (!canBuy(cost)) break;
		
		const serverName = `${serverNamePrefix}-${i}`;
		ns.purchaseServer(serverName, maxRam);
		ns.tprint(`Bought ${serverName} for ${cost}`);
	}
}