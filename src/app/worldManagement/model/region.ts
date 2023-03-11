import { World } from "src/app/_model/world";
import { Geography } from "./geography";
import { PoliticalSystem } from "./political-system";

export class Region {
    id?: string;
    world: World;
    name: string;
    description: string;
    municipality?: string;
    jurisdiction?: Region;
    geography?: Geography;
    politicalSystem?: PoliticalSystem;
}
