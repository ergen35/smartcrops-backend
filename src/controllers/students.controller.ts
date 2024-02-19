import { BadRequestException, Controller, DefaultValuePipe, Get, Logger, Query, Res } from '@nestjs/common';
import StudentsService from 'src/students/students.service';


@Controller('students')
class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @Get('list')
    listAllBySchool(@Query('schoolcode') schoolCode: string | null = null){
        Logger.log("School Code: " + schoolCode);
        
        if(schoolCode){
            return this.studentsService.listStudentsBySchool(schoolCode);
        }

        throw new BadRequestException("schoolcode didn't have a correct value");
    }
}

export default StudentsController;