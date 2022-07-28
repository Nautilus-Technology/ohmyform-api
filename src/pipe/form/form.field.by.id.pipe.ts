import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { FormFieldEntity } from 'src/entity/form.field.entity'
import { FormFieldService } from 'src/service/form/form.field.service'
import { IdService } from '../../service/id.service'

@Injectable()
export class FormFieldByIdPipe implements PipeTransform<string, Promise<FormFieldEntity>> {
  constructor(
    private readonly formFieldService: FormFieldService,
    private readonly idService: IdService,
  ) {
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<FormFieldEntity> {
    const id = this.idService.decode(value)

    return await this.formFieldService.findById(id)
  }
}
