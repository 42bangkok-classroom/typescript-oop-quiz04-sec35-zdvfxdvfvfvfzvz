import { Injectable } from "@nestjs/common";

@Injectable()
export class UserInterface {
    findAll(): string[] {
        const data = JSON.parse("/data/users.json")
        return data.users;
    }
}