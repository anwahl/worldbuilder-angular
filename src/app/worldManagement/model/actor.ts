import { World } from "src/app/_model/world";
import { Language } from "./language";
import { Race } from "./race";
import { Religion } from "./religion";
import { SocialClass } from "./social-class";

export class Actor {
    id?: string;
    world: World;
    firstName: string;
    lastName: string;
    description: string;
    race?: Race;
    socialClass?: SocialClass;
    religion?: Religion;
    languages: Array<Language>;
}
