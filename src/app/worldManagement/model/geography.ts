import { World } from "src/app/_model/world";
import { Resource } from "./resource";

export class Geography {
    id?: string;
    world: World;
    name: string;
    description: string;
    type: string;
    climate?: string;
    resources?: Array<Resource>
    parentGeography?: Geography;
}
