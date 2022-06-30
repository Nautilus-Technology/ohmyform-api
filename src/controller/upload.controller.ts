import { Controller, Delete, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileCreateInput } from 'src/dto/file/file.create.input';
import { FileUtilsService } from 'src/service/file/file.utils.service';

@Controller('upload')
export class UploadController {
  constructor(private fileUtilsService: FileUtilsService){}

  @Post('single/:fieldId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleFile(@UploadedFile() file: FileCreateInput, @Param('fieldId') fieldId){
    console.log('file: ', file);
    console.log('fieldId: ', fieldId);
    await this.fileUtilsService.create(file, fieldId)

    return file;
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>){
    console.log(files);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    files.forEach(async (file) => await this.fileUtilsService.create(file, null))
    return files;
  }

  @Get('info/:filename')
  readUploadedFileInfo(@Param('filename') filename){
    return this.fileUtilsService.read(filename)
  }

  @Get(':filename')
  downloadUploadedFile(@Param('filename') filename, @Res() res){
    return res.sendFile(filename, {root: 'upload'});
  }

  @Delete(':filename')
  deleteUploadedFile(@Param('filename') filename: string){
    return this.fileUtilsService.delete(filename)
  }

}
