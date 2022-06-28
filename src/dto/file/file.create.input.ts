import { Field, InputType } from '@nestjs/graphql';

@InputType('FileCreateInput')
export class FileCreateInput {
    @Field()
    // eslint-disable-next-line indent
    readonly originalname: string

    @Field()
    readonly encoding: string

    @Field()
    readonly mimetype: string

    @Field()
    readonly destination: string

    @Field()
    readonly filename: string

    @Field()
    readonly size: number
}
