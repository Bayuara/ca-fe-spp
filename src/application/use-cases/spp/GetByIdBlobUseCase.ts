import { SppRepository } from "@/domain/repositories/spp.repository";

export class GetByIdBlobUseCase {
  constructor(private readonly sppRepository: SppRepository) {}

  async execute(id: string) {
    const response = await this.sppRepository.getByIdBlob(id);
    return response;
  }
}
