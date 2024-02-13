import { ArgumentMetadata } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';

class StringToIntegerPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    if (Number.isSafeInteger(value)) {
      return Number.parseInt(value);
    }

    throw new Error("Unable to convert string to a safe integer.");
  }
}
