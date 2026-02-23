import useCommonQuery from "./useCommonQuery";
import { arisanStatusPayment } from "@/services/types/arisan";
import { useState } from "react";
import Datepicker from "./DatePicker";
import Combobox from "./Combobox";
import Button from "../common/Button";
import Modal from "./Modals";
import { useIsMobile } from "@/components/hooks/useDeviceScreen";

export type ArisanFilterModalValue = {
  arisanDate?: string;
  paymentDate?: string;
  paymentStatus?: arisanStatusPayment;
};

interface IArisanFilterModalProps {
  open: boolean;
  defaultValue?: ArisanFilterModalValue;
  fetchPaymentStatusData: () => Promise<arisanStatusPayment[]>;
  onClose: (val: { confirmed: boolean; value: ArisanFilterModalValue }) => void;
}
function ArisanFilterModal(props: IArisanFilterModalProps) {
  const { open, fetchPaymentStatusData, onClose, defaultValue } = props;

  const isMobile = useIsMobile();

  const { data: paymentStatuses } = useCommonQuery(
    "paymentStatus",
    fetchPaymentStatusData
  );

  // console.log("Payment status: ",paymentStatuses);

  const [arisanDate, setArisanDate] = useState<Date | undefined>(() => {
    if (defaultValue?.arisanDate) return new Date(defaultValue.arisanDate);
  });

  const [paymentDate, setPaymentDate] = useState<Date | undefined>(() => {
    if (defaultValue?.paymentDate) return new Date(defaultValue.paymentDate);
  });

  const [paymentStatus, setPaymentStatus] = useState<
    arisanStatusPayment | undefined
  >(defaultValue?.paymentStatus);

  const handleClose = (confirmed: boolean) => {
    onClose({
      confirmed,
      value: {
        arisanDate: arisanDate?.toISOString(),
        paymentDate: paymentDate?.toISOString(),
        paymentStatus,
      },
    });
  };

  return (
    <Modal
      size={isMobile ? "xs" : "2xl"}
      open={open}
      onClose={() => handleClose(false)}
      title="Filtering Data Arisan"
    >
      <Datepicker
        label="Tanggal Pengundian Arisan"
        defaultValue={defaultValue?.arisanDate}
        onChange={setArisanDate}
      />

      <Datepicker
        label="Tanggal Pembayaran Arisan"
        defaultValue={defaultValue?.paymentDate}
        onChange={setPaymentDate}
      />

      <Combobox
        options={paymentStatuses}
        onChange={(val) => setPaymentStatus(val)}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
        label="Status Pembayaran Arisan"
      />

      <div className="mt-8">
        <Button className="mb-4" block onClick={() => handleClose(true)}>
          Filter
        </Button>
        <Button
          variant="outline"
          className="mb-4"
          block
          onClick={() => handleClose(false)}
        >
          Kembali
        </Button>
      </div>
    </Modal>
  );
}

export default ArisanFilterModal;
