import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Next, Param, Post, Put, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { SchoolsService } from "src/schools/schools.service"; 
import type { Request, Response } from "express";
import { Logger} from "@nestjs/common";
import SchoolCreateDTO from "src/Models/DTOs/SchoolCreateDTO";
import { AuthGuard } from "src/auth/auth.guard";
import { ConfigService } from "@nestjs/config";
import { AppConfig, DatabaseConfig } from "src/configuration/DatabaseConfig";
import { Cache } from "cache-manager";

@Controller('schools')
export class SchoolsController {

    private readonly internalData: Array<Object> = [this.schoolsService.getSchool()];

    constructor(private readonly schoolsService: SchoolsService,
                private readonly configService: ConfigService<AppConfig>,
                @Inject("CACHE_MANAGER") private readonly cache: Cache) {}
    
    @Get('get/:id')
    async getSchool(@Param('id') id: string){
        
        let school = await this.cache.get<Object>(`school-${id}`)
        if(!school){

            Logger.log("School value From Provider", SchoolsController.name);
            school = this.schoolsService.getSchool();
            await this.cache.set(`school-${id}`, school, 30000);
            
            return school;
        }
        
        Logger.log("School value returned From Cache");
        return school;
    }

    @Get('list')
    // @UseGuards(AuthGuard)
    listSchools(){
        // Logger.log("Database Name is: " + this.configService.get<string>("DATABASE_USERNAME", "balala"))
        Logger.log("DB Host is: " + this.configService.get<DatabaseConfig>('database')?.host)
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