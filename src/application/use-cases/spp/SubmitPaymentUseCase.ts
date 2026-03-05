import { SppRepository } from "@/domain/repositories/spp.repository";

export class SubmitPaymentUseCase {
  constructor(private readonly sppRepository: SppRepository) {}

  async execute(url: string, body: object) {
    return this.sppRepository.submitPayment(url, body);
  }
}
