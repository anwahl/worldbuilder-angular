import { World } from "src/app/_model/world";
import { Race } from "./race";
import { Region } from "./region";

export class SocialClass {
    id?: string;
    world: World;
    name: string;
    description: string;
    region: Region;
    race: Race;
}
