import fs from 'node:fs/promises'
import path from 'node:path'
import {randomInt, randomUUID} from "crypto";
export class Generator {
    async generate(linesCount: number): Promise<string> {
        const fileName = "input.txt";
        const file = await fs.open(fileName, "w");
        const stream = file.createWriteStream();
        for(let i = 0; i < linesCount; ++i) {
            stream.write(this.generateString() + "\n");
        }
        return fileName;
    }
    private generateString(): string {
        return randomUUID();
    }
}