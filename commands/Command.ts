export interface Command {
    run(args: string[], options: Record<string, string>): void | Promise<void>
}
