import { Controller, Get, Ip, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('gasoline')
export class GasolineController {

    @Get()
    getPage(@Req() request: Request, @Res() response: Response){
        response.render('gasoline/index', { message: request.ip })
    }

    @Get('page2')
    @Render('gasoline/index')
    getPage2(@Ip() ip: string){
        return { message: ip }
    }
}
