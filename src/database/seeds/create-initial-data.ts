import {Factory, Seeder} from 'typeorm-seeding';
import {Connection} from "typeorm";
import {Workspaces} from "../../entities/Workspaces";
import {Channels} from "../../entities/Channels";

export class CreateInitialData implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert().into(Workspaces)
            .values([{ id: 1, name: 'Sleact!', url: 'sleactzz' }]).execute();
        await connection
            .createQueryBuilder()
            .insert()
            .into(Channels)
            .values([{ id: 1, name: '일반z', workspaceId: 1, private: false }]).execute();
    }
}
