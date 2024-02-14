import { Body, Controller, Get, HttpCode, HttpStatus, Next, Post, Put, Query, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { SchoolsService } from "src/schools/schools.service"; 
import type { Request, Response } from "express";
import { Logger} from "@nestjs/common";
import SchoolCreateDTO from "src/Models/DTOs/SchoolCreateDTO";


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
    createSchool(@Body() data: SchoolCreateDTO){
        this.internalData.push(data);
    }

    @Put('update/:id')
    @HttpCode(HttpStatus.ACCEPTED)
    updateSchool(@Req() request: Request, @Res() response: Response): Object  
    {
        return this.schoolsService.getSchool();
    }

    @Get('vellar')
    getVellar(@Query('bose', new ValidationPipe({ transform: true })) boseLevel: string){
        return [boseLevel];
    }
}