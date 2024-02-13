import { Injectable } from "@nestjs/common";


@Injectable()
export class SchoolsService{
    getSchool(): Object {
        return { name: "hecm", promoterName: "ake natonde" }
    }
}