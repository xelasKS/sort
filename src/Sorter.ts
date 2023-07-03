import {Database} from "sqlite3"
import {open} from "sqlite"
import fs from "node:fs/promises";
export class Sorter {
    async sort(fileName: string): Promise<void> {
        const db = await open({filename: "database.db", driver: Database});
        /*await db.exec("CREATE TABLE tbl (col text)");
        await db.exec("CREATE INDEX column_idx ON tbl (col)");
         */
        const insertStatement = await db.prepare("INSERT INTO tbl VALUES (?)");
        const file = await fs.open(fileName, "r");
        for await (const line of file.readLines()) {
            await insertStatement.run(line);
        }
        const output = await fs.open("output.txt", "w");
        await db.each("SELECT col FROM tbl ORDER BY col ASC", [], async (error, row) => {
            await output.write(row.col + "\n");
        })

    }
}