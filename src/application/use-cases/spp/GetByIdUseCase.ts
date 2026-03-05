import { SppRepository } from "@/domain/repositories/spp.repository";

export class GetByIdUseCase {
  constructor(private readonly sppRepository: SppRepository) {}

  async execute(id: number) {
    return this.sppRepository.getById(id);
  }
}
