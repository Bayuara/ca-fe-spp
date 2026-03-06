import { SppRepository } from "@/domain/repositories/spp.repository";

export class GetByIdBlobUseCase {
  constructor(private readonly sppRepository: SppRepository) {}

  async execute(id: number) {
    const response = await this.sppRepository.getByIdBlob(id);
    return response;
  }
}
