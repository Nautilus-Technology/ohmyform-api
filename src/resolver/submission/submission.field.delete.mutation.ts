import { Injectable } from '@nestjs/common'
import { Args, ID, Mutation } from '@nestjs/graphql'
import { FormFieldEntity } from 'src/entity/form.field.entity'
import { SubmissionEntity } from 'src/entity/submission.entity'
import { FormFieldByIdPipe } from 'src/pipe/form/form.field.by.id.pipe'
import { SubmissionByIdPipe } from 'src/pipe/submission/submission.by.id.pipe'
import { SubmissionFieldDeleteService } from 'src/service/submission/submission.field.delete.service'
import { SubmissionService } from 'src/service/submission/submission.service'
import { User } from '../../decorator/user.decorator'
import { UserEntity } from '../../entity/user.entity'
import { FormService } from '../../service/form/form.service'
import { IdService } from '../../service/id.service'

@Injectable()
export class SubmissionFieldDeleteMutation {
  constructor(
    private readonly deleteService: SubmissionFieldDeleteService,
    private readonly submissioinService: SubmissionService,
    private readonly formService: FormService,
    private readonly idService: IdService,
  ) {
  }

  @Mutation(() => Boolean)
  async submissionFieldDelete(
    @User() user: UserEntity,
    @Args({ name: 'submission', type: () => ID }, SubmissionByIdPipe) submission: SubmissionEntity,
    @Args({ name: 'field', type: () => ID }, FormFieldByIdPipe) field: FormFieldEntity,
    @Args({ name: 'token', type: () => String}) token: string,
  ): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!await this.submissioinService.isOwner(submission, token)) {
      throw new Error('no access to submission')
    }

    await this.deleteService.delete(submission, field)

    return true
  }
}
