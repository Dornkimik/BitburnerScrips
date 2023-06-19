/** @param {NS} ns */
export async function main(ns) {

	let currentMoney = ns.getServerMoneyAvailable("home");

	let nodeCost = ns.hacknet.getPurchaseNodeCost();


	// To-do autoupgrade
	async function UpgradeHacknode(nodeIndex) {
		ns.hacknet.upgradeLevel(nodeIndex, 1);
		ns.alert("node " + nodeIndex + "was upgraded");
	}



}