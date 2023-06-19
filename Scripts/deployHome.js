/** @param {NS} ns */
export async function main(ns) {
	var stores = ["foodnstuff", "sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea",
	"harakiri-sushi", "neo-net", "zer0", "max-hardware", "iron-gym", "phantasy",
	"silver-helix", "omega-net", "crush-fitness", "johnson-ortho", "the-hub",
	"netlink", "rothman-uni", "catalyst", "summit-uni", "rho-construction", "millenium-fitness",
	"aevum-police", "alpha-ent", "syscore", "lexo-corp", "snap-fitness", "global-pharm",
	"applied-energetics", "unitalife", "univ-energy", "nova-med", "zb-def", "zb-institute",
	"vitalife", "titan-labs", "solaris", "microdyne", "helios", "deltaone", "icarus", "zeus-med",
	"omnia", "defcomm", "galactic-cyber", "infocomm", "taiyang-digital", "stormtech", "aerocorp",
	"clarkinc", "omnitek", "nwo", "4sigma", "blade", "b-and-a", "ecorp", "fulcrumtech", "megacorp",
	"kuai-gong", "fulcrumassets", "powerhouse-fitness"];

	let hackThreads = 14;
	let growThreads_ = 152;
	let weakenThreads = 30;

	let storeIndex = 0;


	let multiplier = ns.args[0];

	let ownHackingLevel = ns.getHackingLevel();


	while(true) {

		let availableRam = ns.getServerMaxRam("home") - ns.getServerUsedRam("home");

		let neededHackRam = ns.getScriptRam("hack.js", "home") * hackThreads * multiplier;
		let neededGrowRam = ns.getScriptRam("grow.js", "home") * growThreads_ * multiplier;
		let neededWeakenRam = ns.getScriptRam("weaken.js", "home") * weakenThreads * multiplier;

		let neededRam = neededHackRam + neededGrowRam + neededWeakenRam;

		if (neededRam < availableRam && storeIndex < stores.length && ownHackingLevel >= ns.getServerRequiredHackingLevel(stores[storeIndex])) {
			await ns.sleep(250);
			ns.exec("crack.js", "home", 1, stores[storeIndex]);

			ns.exec("hack.js", "home", hackThreads * multiplier, stores[storeIndex]);
			ns.exec("grow.js", "home", growThreads_ * multiplier, stores[storeIndex]);
			ns.exec("weaken.js", "home", weakenThreads * multiplier, stores[storeIndex]);
			storeIndex++;
		} else if (neededRam < availableRam && storeIndex < stores.length && ownHackingLevel < ns.getServerRequiredHackingLevel(stores[storeIndex])){
			await ns.sleep(250);
			storeIndex++;
		} else {
			await ns.sleep(250);
			return false;
		}

	}
}