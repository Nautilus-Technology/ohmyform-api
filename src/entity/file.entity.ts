import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FormFieldEntity } from './form.field.entity';

@Entity({name: 'file'})
export class FileEntity{
    @PrimaryGeneratedColumn()
  public id: number

    @Column()
    public originalname: string

    @Column()
    public encoding: string

    @Column()
    public mimetype: string

    @Column()
    public destination: string

    @Column()
    public filename: string

    @Column()
    public size: number

    @ManyToOne(() => FormFieldEntity)
    public field: FormFieldEntity

  @Column({type: 'integer', unsigned: true})
    public fieldId?: number

}
