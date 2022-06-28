import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileCreateInput } from 'src/dto/file/file.create.input';
import { FileEntity } from 'src/entity/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUtilsService{
  constructor(@InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>
  ){}

  async create(file: FileCreateInput): Promise<FileEntity>{
    const newFile = new FileEntity()

    newFile.originalname = file.originalname
    newFile.encoding = file.encoding
    newFile.mimetype = file.mimetype
    newFile.destination = file.destination
    newFile.filename = file.filename
    newFile.size = file.size

    await this.fileRepository.save(newFile)

    return newFile
  }

  read(filename: string): Promise<FileEntity | undefined>{
    return this.fileRepository.findOne({filename})
  }

  async delete(filename: string){
    const toDeleteFile = this.fileRepository.findOne({filename})
    return this.fileRepository.delete((await toDeleteFile).id)
  }
}
