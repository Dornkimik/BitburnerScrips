/** @param {NS} ns */
export async function main(ns) {

	let currentMoney = ns.getServerMoneyAvailable("home");

	// percentage of current money at which a node should be buyed
	let buyPercentage = ns.args[0];
	let nodeIndex;

	while (true) {
		await AutoBuyHacknodes();
	}
	
	async function AutoBuyHacknodes() {

		let currentMoney = ns.getServerMoneyAvailable("home");
		let nodeCost = ns.hacknet.getPurchaseNodeCost();

		if (currentMoney * buyPercentage >= nodeCost) {
			nodeIndex = ns.hacknet.purchaseNode();
			UpgradeNewHacknode();
			ns.alert("node was buyed with the index: " + nodeIndex);
			await ns.sleep(1000);
		}  else {
			ns.print(buyPercentage * 100 + "% of the money: " + currentMoney * buyPercentage);
			ns.print("nodecost: " + nodeCost);
			ns.print("money missing: " + (nodeCost - currentMoney * buyPercentage) / 1000000 + " Mio")
			await ns.sleep(25000);
		}
	}

	function UpgradeNewHacknode() {
		if (currentMoney * 0.3 >= ns.hacknet.getLevelUpgradeCost(nodeIndex, 200)) {
			ns.hacknet.upgradeLevel(nodeIndex, 200);
		}

		if (currentMoney * 0.2 >= ns.hacknet.getRamUpgradeCost(nodeIndex, 6)) {
			ns.hacknet.upgradeRam(nodeIndex, 6);
		}

		if (currentMoney * 0.1 >= ns.hacknet.getCoreUpgradeCost(nodeIndex, 16)) {
			ns.hacknet.upgradeCore(nodeIndex, 16);
		}
	}
}