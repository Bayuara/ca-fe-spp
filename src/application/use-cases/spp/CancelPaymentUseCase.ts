import { SppRepository } from "@/domain/repositories/spp.repository";

export class CancelPaymentUseCase {
  constructor(private sppRepository: SppRepository) {}

  async execute(transactionId: string) {
    const response = await this.sppRepository.cancelPayment(transactionId);
    return response;
  }
}
