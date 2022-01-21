const limitMoney = 1_000_000;
const limitUpgradeCost = 20_000;
const multiplier = 1;

const canBuy = (ns, n) => n < limitUpgradeCost && ns.getServerMoneyAvailable('home') - limitMoney >= n;

export function buyNode(ns) {
	if (canBuy(ns, ns.hacknet.getPurchaseNodeCost())) {
		const node = ns.hacknet.purchaseNode();
		ns.print(`Buying node ${node}`);
	}
}

export function buyUpgrades(ns, i) {
	const stats = ns.hacknet.getNodeStats(i);

	if (canBuy(ns, ns.hacknet.getLevelUpgradeCost(i, multiplier))) {
		ns.hacknet.upgradeLevel(i, multiplier);
		ns.print(`Buying level ${stats.level + multiplier} for node ${i}`);
	}

	if (canBuy(ns, ns.hacknet.getRamUpgradeCost(i, multiplier))) {
		ns.hacknet.upgradeRam(i, multiplier);
		ns.print(`Buying ${stats.ram + multiplier} RAM for node ${i}`);
	}

	if (canBuy(ns, ns.hacknet.getCoreUpgradeCost(i, multiplier))) {
		ns.hacknet.upgradeCore(i, multiplier);
		ns.print(`Buying ${stats.cores + multiplier} cores for node ${i}`);
	}
}

export async function main(ns) {
	ns.disableLog('getServerMoneyAvailable');
	ns.disableLog('sleep');

	while (true) {
		buyNode(ns);

		const numberOfNodes = ns.hacknet.numNodes();

		for (let i = 0; i < numberOfNodes; i++) {
			buyUpgrades(ns, i);
		}
		await ns.sleep(10);
	}
}