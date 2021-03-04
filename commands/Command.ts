export interface Command {
    run(...args: string[]): void | Promise<void>
}
