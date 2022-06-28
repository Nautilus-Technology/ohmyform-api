import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

}
