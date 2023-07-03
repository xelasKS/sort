import {Generator} from "./Generator";
import {Sorter} from "./Sorter";

(async () => {
    /*const generator = new Generator();
    await generator.generate(10000);*/
    const sorter = new Sorter();
    await sorter.sort("input.txt");
})()