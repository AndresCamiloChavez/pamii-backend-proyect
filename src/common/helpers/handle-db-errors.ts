import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

export const handleDBErrors = (error: any): never => {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }