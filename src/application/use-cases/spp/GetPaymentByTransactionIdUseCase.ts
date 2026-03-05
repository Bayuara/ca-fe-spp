import { SppRepository } from "@/domain/repositories/spp.repository";

export class GetPaymentByTransactionIdUseCase {
  constructor(private readonly sppRepository: SppRepository) {}

  async execute(transactionId: string) {
    const response =
      await this.sppRepository.getPaymentByTransactionId(transactionId);
    return response;
  }
}
