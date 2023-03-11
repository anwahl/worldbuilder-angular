import { World } from "src/app/_model/world";
import { Religion } from "./religion";

export class God {
    id?: string;
    world: World;
    name: string;
    description: string;
    religion: Religion;
}
