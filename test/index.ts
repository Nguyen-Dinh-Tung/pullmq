import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

// test-utils.ts
export const initialTest = async (): Promise<INestApplication> => {
    const moduleFixture = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    return app;
};
