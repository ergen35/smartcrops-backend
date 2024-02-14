import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if(!metadata.metatype || this.toValidate(metadata.metatype)){
      return value;
    }

    const errors = await validate(value);
    if(errors.length  > 0){
      throw new BadRequestException("Validation Failed")
    }

    return value;
  }


  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
