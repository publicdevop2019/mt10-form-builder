export function safe_hasValue(fn: () => boolean): boolean {
    try {
        return fn();
    } catch (e) {
        return false;
    }

}
export function safe_getValue<T>(fn: () => T, def?: T): T | undefined {
    try {
        return fn() || def;
    } catch (e) {
        return undefined || def;
    }

}
export function safe_addAttribute<T>(fn: () => T, def?: T): T | undefined {
    try {
        return fn() || def;
    } catch (e) {
        return undefined || def;
    }

}
