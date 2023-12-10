import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {fileFilter: fileFilter,
    storage: diskStorage({destination: './static/products',filename: fileNamer}),
    
  })) // limits: {fileSize: 100}
  uploadProductImage(@UploadedFile() file: Express.Multer.File){

    if(!file) {
      throw new BadRequestException('There is no file in the request')
    }

    console.log('Uploading product image')

    return file
  }

}
