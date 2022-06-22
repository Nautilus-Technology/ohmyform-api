import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { Args, Mutation } from "@nestjs/graphql";
import { createWriteStream } from "fs";
import { FileUpload } from "graphql-upload";
import GraphQLUpload = require('graphql-upload/GraphQLUpload.js');
import { resolve } from "path";
import { fileSizeValidation } from "../utils/validation";


export class UploadResolver {
    @Mutation(() => Boolean)
    async uploadFile(
        @Args('file', { type: () => GraphQLUpload}) file: FileUpload,
    ){
        try {
            await fileSizeValidation(file.createReadStream(), 2 * 1000 * 1000).catch(
                (e) => {
                    throw new BadRequestException(e);
                },
            );

            const file_name = await this.uploadFileHelper(file, 'file');
            return true;
        } catch(error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    private uploadFileHelper(
        { createReadStream, encoding, filename, mimetype }: FileUpload,
        field: string,
    ): Promise<string> {
        console.log(mimetype);
        const fName = `${Date.now()}-file.${mimetype.split('/')[1]}`;
        const upload: Promise<string> = new Promise((resolve, reject) => 
            createReadStream()
                .pipe(createWriteStream(`public/${field}/` + fName))
                .on('finish', async () => {
                    resolve(fName);
                })
                .on('error', (err) => {
                    reject(err);
                }),
        );
        return upload;
    }
}