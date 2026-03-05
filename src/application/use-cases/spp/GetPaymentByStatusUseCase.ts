import { SppRepository } from "@/domain/repositories/spp.repository";

export class GetPaymentByStatusUseCase {
  constructor(private sppRepository: SppRepository) {}

  async execute(statusPaymentId: number) {
    const response =
      await this.sppRepository.getPaymentByStatus(statusPaymentId);
    return response;
  }
}
