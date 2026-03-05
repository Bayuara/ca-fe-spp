import { SppRepository } from "@/domain/repositories/spp.repository";

export class GetAllSppUseCase { 
  constructor(private sppRepository: SppRepository) { }
  
  async execute() { 
    const response = await this.sppRepository.getAllSpp();
    return response;
  }
}