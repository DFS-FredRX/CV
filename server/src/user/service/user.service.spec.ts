import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repository
  
  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    find: jest.fn(),
    merge: jest.fn(),
    remove: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: getRepositoryToken(User), useValue: mockUserRepository }],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {

    it("devrait hacher le mot de passe et sauvegarder l'utilisateur", async () => {
      const createUserDTO = {
        firstname: 'Jean',
        lastname: 'Dupont',
        username: 'jdupont',
        email: 'jean@test.com',
        password: 'password123'
      }
      repository.findOne.mockResolvedValue(null)
      repository.create.mockReturnValue(createUserDTO)
      repository.save.mockResolvedValue({ id: 1, ...createUserDTO })
      const result = await service.create(createUserDTO)
      expect(repository.findOne).toHaveBeenCalled()
      expect(repository.save).toHaveBeenCalled()
      expect(result).toHaveProperty('id')
      expect(result.hashed_password).not.toBe('password123')
    })

    it("devrait lancer une ConflictException si l'email existe déjà", async () => {
      repository.findOne.mockResolvedValue(new User())
      await expect(service.create({
        firstname: 'a',
        lastname: 'b',
        username: 'u',
        email: 'exist@test.com',
        password: 'p'
      })).rejects.toThrow(ConflictException)
    })

  })

  describe('findOne', () => {

    it("devrait retourner un utilisateur s'il existe", async () => {
      const user = { id: 1, username: 'test' }
      repository.findOneBy.mockResolvedValue(user)
      const result = await service.findOne(1)
      expect(result).toEqual(user)
    })

    it("devrait lancer une NotFoundException si l'utilisateur n'existe pas", async () => {
      repository.findOneBy.mockResolvedValue(null)
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException)
    })

  })

  describe('update', () => {

    it("devrait mettre à jour l'utilisateur (sans re-hacher si le password n'est pas fourni)", async () => {
      const existingUser = { id: 1, firstname: 'Old' }
      const updateDTO = { firstname: 'New' }
      repository.findOneBy.mockResolvedValue(existingUser)
      repository.merge.mockReturnValue({ ...existingUser, ...updateDTO })
      repository.save.mockResolvedValue({ ...existingUser, ...updateDTO })
      const result = await service.update(1, updateDTO)
      expect(result.firstname).toEqual('New')
      expect(repository.save).toHaveBeenCalled()
    })

  })

  describe('remove', () => {

    it("devrait supprimer l'utilisateur s'il existe", async () => {
      const user = { id: 1 }
      repository.findOneBy.mockResolvedValue(user)
      repository.remove.mockResolvedValue(user)
      await service.remove(1)
      expect(repository.remove).toHaveBeenCalledWith(user)
    })
    
  })

});
