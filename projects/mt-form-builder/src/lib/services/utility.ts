export class Utility {
    static flatMap(input: any[][]) {
        const output = [];
        input.forEach(e => {
            e.forEach(e => {
                output.push(e)
            })
        })
        return output;
    }
    public static notEmpty(input?: any[]): boolean {
        return input && input.length > 0
    }
    public static copyOf<T>(source: T): T {
        return JSON.parse(JSON.stringify(source))
    }
}