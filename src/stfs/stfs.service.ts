import { Injectable } from '@nestjs/common';

@Injectable()
export class StfsService {
    getStfs(schoolCode: string | null){
        if(!schoolCode){
            return null;
        }

        return { code: "556", name: "année blabla", id: "6a6z2cec9e8cz", creationDate: new Date(2024, 1, 2) }
    }
}
