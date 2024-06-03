const sleepInMS = (ms: number) => new Promise((r) => setTimeout(r, ms));

export { sleepInMS };