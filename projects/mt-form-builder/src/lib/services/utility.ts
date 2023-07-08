export class Utility {
    private static isDebug = false;
    public static notEmpty(input?: any[]): boolean {
        return input && input.length > 0
    }
    public static print(input: string, ...args: any[]) {
        if (Utility.isDebug) {
            args.forEach(e => {
                if (typeof e !== 'string' || typeof e !== 'boolean') {
                    input = input.replace('{}', JSON.stringify(e))
                } else {
                    input = input.replace('{}', e)
                }
            })
            console.log(input)
        }
    }
    public static printImmutable(input: any) {
        if (Utility.isDebug) {
            console.dir(JSON.stringify(input))
        }
    }
    public static copyOf<T>(source: T): T {
        return JSON.parse(JSON.stringify(source))
    }
}