export class Logger {
    private static logLevel: 'DEBUG' | 'TRACE' | 'ERROR' = 'ERROR';
    public static debug(input: string, ...args: any[]) {
        if (Logger.logLevel === 'DEBUG') {
            this.log(input, args)
        }
    }
    public static debugObject(input: string, ...args: any[]) {
        if (Logger.logLevel === 'DEBUG') {
            console.log(input)
            args.forEach(e => {
                console.dir(e)
            })
        }
    }
    public static traceObject(input: string, ...args: any[]) {
        if (Logger.logLevel === 'TRACE') {
            console.log(input)
            args.forEach(e => {
                console.dir(e)
            })
        }
    }
    public static trace(input: string, ...args: any[]) {
        if (Logger.logLevel === 'TRACE') {
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
}