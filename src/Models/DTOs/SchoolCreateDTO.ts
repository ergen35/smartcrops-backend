import { Type } from 'class-transformer';
import { IsString, MaxLength, MinLength, IsDate, MaxDate, MinDate  } from 'class-validator'

export default class SchoolCreateDTO {

    @IsString() @MinLength(5)
    public name: string;

    @IsString() @MinLength(6) @MaxLength(8)
    public codeName: string;

    @Type(() => Date)   // used to transform received types to concrete types (ex: transforming "2023-02-14T09:01:40.728Z" <-to-> q valide Date object assignable to 'creationDate' )
    @IsDate() @MaxDate(new Date()) @MinDate(new Date(1500, 1, 1))
    public creationDate: Date;

    @IsString() @MinLength(5) @MaxLength(1024)
    public promoterName: string;
}