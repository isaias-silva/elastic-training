import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import pino from "pino";

const logFilePath = resolve(import.meta.dir, "../../docker/logs/access_log");

mkdirSync(dirname(logFilePath), { recursive: true });

const fileDestination = pino.destination({
    dest: logFilePath,
    mkdir: true,
    sync: true
});

const stdoutDestination = pino.destination(1);

export const logger = pino({
    level: "info",
    base: undefined
}, pino.multistream([
    { stream: stdoutDestination },
    { stream: fileDestination }
]));
