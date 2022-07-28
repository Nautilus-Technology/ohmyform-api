import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FormFieldEntity } from 'src/entity/form.field.entity'
import { SubmissionFieldEntity } from 'src/entity/submission.field.entity'
import { Repository } from 'typeorm'
import { FormEntity } from '../../entity/form.entity'
import { SubmissionEntity } from '../../entity/submission.entity'

@Injectable()
export class SubmissionFieldDeleteService {
  constructor(
    @InjectRepository(SubmissionFieldEntity)
    private readonly submissionFieldRepository: Repository<SubmissionFieldEntity>,
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
    @InjectRepository(SubmissionEntity)
    private readonly submissionRepository: Repository<SubmissionEntity>,
  ) {
  }

  async delete(submission: SubmissionEntity, field: FormFieldEntity): Promise<void> {
    await this.submissionFieldRepository.delete({
      submission,
      field,
    })
  }
}
