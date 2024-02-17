import { IsDate, IsString, MaxDate, MaxLength, MinDate, MinLength } from "class-validator";
import { Type } from "class-transformer";

export default class UserCreateDTO {

    @IsString() @MinLength(2) @MaxLength(128)
    firstName: string

    @IsString() @MinLength(2) @MaxLength(128)
    lastName: string

    @IsDate() @MinDate(new Date(1800, 1, 1))
    @MaxDate(new Date(new Date().getFullYear(), 1, 1))
    @Type(() => Date)
    birthDate: Date
}