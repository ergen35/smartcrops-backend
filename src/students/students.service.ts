import { Injectable } from '@nestjs/common';
import { SchoolsService } from 'src/schools/schools.service';

@Injectable()
class StudentsService {
    constructor (private readonly schoolService: SchoolsService){}

    listStudentsBySchool(schoolCode: string){
        return this.schoolService.getSchool();
    }
}

export default StudentsService;
