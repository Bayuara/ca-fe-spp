import { SppRepository } from "@/domain/repositories/spp.repository";

export class GetsUseCase {
  constructor(private readonly repository: SppRepository) {}

  async execute() {
    const response = await this.repository.gets();
    return response;
  }
}
