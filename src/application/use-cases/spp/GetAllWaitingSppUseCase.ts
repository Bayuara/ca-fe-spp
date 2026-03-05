import { SppRepository } from "@/domain/repositories/spp.repository";

export class GetAllWaitingSppUseCase {
  constructor(private sppRepository: SppRepository) {}

  async execute() {
    const response = await this.sppRepository.getAllWaitingSpp();
    return response;
  }
}
