import { SppRepository } from "@/domain/repositories/spp.repository";

export class GetAllSppByMonthUseCase {
  constructor(private sppRepository: SppRepository) {}

  async execute() {
    const response = await this.sppRepository.getAllSppByMonth();
    return response;
  }
}
