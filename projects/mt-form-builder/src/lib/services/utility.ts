export class Utility {
    private static logLevel: 'DEBUG' | 'TRACE' | 'ERROR' = 'DEBUG';
    public static notEmpty(input?: any[]): boolean {
        return input && input.length > 0
    }
    public static logDebug(input: string, ...args: any[]) {
        if (Utility.logLevel === 'DEBUG') {
            this.log(input, args)
        }
    }
    public static logDebugObject(input: string, ...args: any[]) {
        if (Utility.logLevel === 'DEBUG') {
            console.log(input)
            args.forEach(e => {
                console.dir(e)
            })
        }
    }
    public static logTraceObject(input: string, ...args: any[]) {
        if (Utility.logLevel === 'TRACE') {
            console.log(input)
            args.forEach(e => {
                console.dir(e)
            })
        }
    }
    public static logTrace(input: string, ...args: any[]) {
        if (Utility.logLevel === 'TRACE') {
            this.log(input, args)
        }
    }
    private static log(input: string, args: any[]) {
        args.forEach(e => {
            if (typeof e !== 'string' || typeof e !== 'boolean') {
                input = input.replace('{}', JSON.stringify(e))
            } else {
                input = input.replace('{}', e)
            }
        })
        console.log(input)
    }
    public static copyOf<T>(source: T): T {
        return JSON.parse(JSON.stringify(source))
    }
}