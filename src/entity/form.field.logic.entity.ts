import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { FormFieldEntity } from './form.field.entity'

export type FormFieldLogicAction = 'visible' | 'require' | 'disable' | 'jumpTo'

@Entity({ name: 'form_field_logic' })
export class FormFieldLogicEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => FormFieldEntity, field => field.options)
  public field: FormFieldEntity

  @Column()
  public formula: string

  @Column({ nullable: true })
  public idx?: number

  @Column({ type: 'varchar', length: 10 })
  public action: FormFieldLogicAction

  @Column({ nullable: true })
  public visible?: boolean

  @Column({ nullable: true })
  public require?: boolean

  @Column({ nullable: true })
  public disable?: boolean

  @ManyToOne(() => FormFieldEntity, formField => formField)
  @JoinColumn({name: 'jumpToId'})
  public jumpTo?: FormFieldEntity

  @Column({type: 'integer', unsigned: true, nullable: true})
  public jumpToId?: number

  @Column()
  public enabled: boolean
}
