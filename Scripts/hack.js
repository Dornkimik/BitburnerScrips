/** @param {NS} ns */
export async function main(ns) {
	var target = ns.args[0]

	while (true) {
		await ns.asleep(1000);
		await ns.hack(target);
	}
}