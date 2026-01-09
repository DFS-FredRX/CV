import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmTestConfig } from '../setup-typeorm';
import { DataSource } from 'typeorm';

describe('UserController', () => {

  let app: INestApplication
  let dataSource: DataSource

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
    .overrideModule(TypeOrmModule)
    .useModule(TypeOrmModule.forRoot(typeOrmTestConfig))
    .compile();

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
    dataSource = app.get(DataSource)
  })

  beforeEach(async () => {
    await dataSource.synchronize(true)
  })

  describe('POST /user', () => {

    it('devrait créer un utilisateur et retourner un code 201', () => {
      return request(app.getHttpServer())
        .post('/user')
        .send({
          firstname: 'Alice',
          lastname: 'Wonder',
          username: 'alice_w',
          email: 'alice@test.com',
          password: 'password123'
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.username).toEqual('alice_w')
          expect(res.body).not.toHaveProperty('hashed_password')
        })
    })

    it('devrait retourner un email invalide (Validation DTO)', () => {
      return request(app.getHttpServer())
        .post('/user')
        .send({
          firstname: 'Alice',
          lastname: 'Wonder',
          username: 'alice_w2',
          email: 'mauvais-email',
          password: 'password123'
        })
        .expect(400)
    })

  })

  describe('PATCH /user/:id', () => {

    it('devrait mettre à jour le prénom', async () => {
      const response = await request(app.getHttpServer())
        .post('/user')
        .send({
          firstname: 'Alice',
          lastname: 'Wonder',
          username: 'alice_w',
          email: 'alice@test.com',
          password: 'password123'
        })
      const userId = response.body.id
      return request(app.getHttpServer())
        .patch(`/user/${userId}`)
        .send({ firstname: 'Alice-Updated' })
        .expect(200)
        .expect((res) => {
          expect(res.body.firstname).toEqual('Alice-Updated')
        })
    })

  })

  afterAll(async () => {
    await app.close()
  })

});
