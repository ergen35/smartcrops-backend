import { Controller, Get, HttpCode, HttpStatus, Next, Post, Put, Req, Res } from "@nestjs/common";
import { SchoolsService } from "src/schools/schools.service"; 
import type { Request, Response } from "express";
import { Logger} from "@nestjs/common";


@Controller('schools')
export class SchoolsController {

    private readonly internalData: Array<Object> = [this.schoolsService.getSchool()];

    constructor(private readonly schoolsService: SchoolsService) {}
    
    @Get('get/:id')
    getSchool(@Req() request: Request){
        Logger.log("School ID is: " + request.params.id, SchoolsController.name);
        return this.schoolsService.getSchool();
    }

    @Get('list')
    listSchools(){
        return this.internalData;
    }

    @Post('create')
    createSchool(@Req() request: Request, @Res() response: Response){
        
        const data = { name: request.body.name, promoterName: request.body.promoterName }        
        this.internalData.push(data);

        response.status(201)
                .end("Created");
    }

    @Put('update/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    updateSchool(@Req() request: Request, @Res() response: Response): Object  
    {
        return this.schoolsService.getSchool();
    }
}