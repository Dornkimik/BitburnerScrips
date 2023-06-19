/** @param {NS} ns */
export async function main(ns) {
	
	let purchasedServers = ns.getPurchasedServers();

	for (var i = 0; i < purchasedServers.length; i++) {
		ns.killall("pserver-" + i)
	}
	
}