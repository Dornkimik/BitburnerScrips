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


	let serverIndex = 0;
	let storeIndex = 0;

	let serverList = ns.getPurchasedServers();
	let serverAmount = serverList.length;

	let hackThreads = 14;
	let growThreads_ = 152;
	let weakenThreads = 30;



	let multiplier = ns.args[0];

	let ownHackingLevel = ns.getHackingLevel();

	let availableRam;

	while (true) {
		

		if (ns.serverExists("pserver-" + serverIndex)) {
			availableRam = ns.getServerMaxRam("pserver-" + serverIndex) - ns.getServerUsedRam("pserver-" + serverIndex);
		}

		let neededHackRam = ns.getScriptRam("hack.js", "home") * hackThreads * multiplier;
		let neededGrowRam = ns.getScriptRam("grow.js", "home") * growThreads_ * multiplier;
		let neededWeakenRam = ns.getScriptRam("weaken.js", "home") * weakenThreads * multiplier;

		let neededRam = neededHackRam + neededGrowRam + neededWeakenRam;
		ns.print("needed ram: " + neededRam + " available ram " + availableRam + " for server: " + "pserver-" + serverIndex);
		
		if (neededRam < availableRam && serverIndex < serverAmount && storeIndex < stores.length && ownHackingLevel >= ns.getServerRequiredHackingLevel(stores[storeIndex])) {
			await ns.sleep(250);
			ns.exec("crack.js", "home", 1, stores[storeIndex]);

			ns.exec("hack.js", "pserver-" + serverIndex, hackThreads * multiplier, stores[storeIndex]);
			ns.exec("grow.js", "pserver-" + serverIndex, growThreads_ * multiplier, stores[storeIndex]);
			ns.exec("weaken.js", "pserver-" + serverIndex, weakenThreads * multiplier, stores[storeIndex]);
			storeIndex++;
		} else if (neededRam > availableRam && serverIndex < serverAmount && storeIndex < stores.length && ownHackingLevel >= ns.getServerRequiredHackingLevel(stores[storeIndex])) {
			await ns.sleep(250);
			ns.print("server index: " + serverIndex + " server amount: " + serverAmount);
			serverIndex++;
		} else if (neededRam < availableRam && serverIndex < serverAmount && storeIndex < stores.length && ownHackingLevel < ns.getServerRequiredHackingLevel(stores[storeIndex])) {
			await ns.sleep(250);
			storeIndex++;
		} else {
			ns.alert("finished");
			return false;
		}
	}


	/*
	while (true) {
		
		if (ns.serverExists("pserver-" + serverIndex)) {
			availableRam = ns.getServerMaxRam("pserver-" + serverIndex) - ns.getServerUsedRam("pserver-" + serverIndex);
		}

		let neededHackRam = ns.getScriptRam("hack.js", "home") * hackThreads * multiplier;
		let neededGrowRam = ns.getScriptRam("grow.js", "home") * growThreads_ * multiplier;
		let neededWeakenRam = ns.getScriptRam("weaken.js", "home") * weakenThreads * multiplier;

		let neededRam = neededHackRam + neededGrowRam + neededWeakenRam;
		ns.print("needed ram: " + neededRam + " available ram " + availableRam + " for server: " + "pserver-" + serverIndex);
		
		if (neededRam < availableRam && serverIndex < serverAmount && storeIndex < stores.length && ownHackingLevel >= ns.getServerRequiredHackingLevel(stores[storeIndex])) {
			await ns.sleep(250);
			ns.exec("crack.js", "home", 1, stores[storeIndex]);

			ns.exec("hack.js", "pserver-" + serverIndex, hackThreads * multiplier, stores[storeIndex]);
			ns.exec("grow.js", "pserver-" + serverIndex, growThreads_ * multiplier, stores[storeIndex]);
			ns.exec("weaken.js", "pserver-" + serverIndex, weakenThreads * multiplier, stores[storeIndex]);
			storeIndex++;
		} else if (neededRam > availableRam && serverIndex < serverAmount && storeIndex < stores.length && ownHackingLevel >= ns.getServerRequiredHackingLevel(stores[storeIndex])) {
			await ns.sleep(250);
			ns.print("server index: " + serverIndex + " server amount: " + serverAmount);
			serverIndex++;
		} else if (neededRam < availableRam && serverIndex < serverAmount && storeIndex < stores.length && ownHackingLevel < ns.getServerRequiredHackingLevel(stores[storeIndex])) {
			await ns.sleep(250);
			storeIndex++;
		} else {
			ns.alert("finished");
			return false;
		}
	}

	*/
}