import { Column, DataType } from 'sequelize-typescript';
import TableBuild, { BaseModel } from '../base.model';
import { EDeadLetter } from '../enums/dead-letter-queue.enum';

@TableBuild({
    tableName: 'dead_letter_queues',
})
export class DeadLetterModel extends BaseModel {
    @Column({
        type: DataType.STRING,
    })
    payload: any;

    @Column({ type: DataType.STRING })
    type: EDeadLetter;
}
export default DeadLetterModel;
