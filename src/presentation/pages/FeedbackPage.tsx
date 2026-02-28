import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Button from "../components/common/Button";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { Feedback } from "@/services/types/feedback";
import { toast } from "sonner";
import FeedbackService from "@/services/feedbackServices";
import SuccessModals from "@/presentation/components/common/SuccessModals";

const schema = yup.object().shape({
  rating: yup
    .number()
    .min(1, "Rating Harus Diisi min 1")
    .required("Rating Harus Diisi"),
  message: yup
    .string()
    .required("Pesan harus diisi")
    .max(300, "Pesan maksimal 300 kata"),
});

const FeedbackPage: React.FC = () => {
  const [hover, setHover] = useState(0);
  const [starRating, setStarRating] = useState(0); // State to keep track of the selected rating
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Feedback>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Feedback> = async (data) => {
    setLoading(true);
    try {
      // await FeedbackService.sendFeedback(data);
      await FeedbackService.sendFeedback(data);
      setIsModalOpen(true);
      reset();
      setStarRating(0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.error(`error catch:${error.message}`);
      toast.error(`Error: ${error.message}`);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const handleRatingClick = (rating: number) => {
    setStarRating(rating);
    setValue("rating", rating, { shouldValidate: true });
  };

  return (
    <div className="min-h-full bg-putihNormal">
      <div className="container max-w-full justify-center">
        <div className="laptop:pt-10 text-center pt-4 px-6">
          <h1 className="text-3xl font-bold phone:text-lg">
            Terima kasih telah menggunakan SPPKu!
          </h1>
          <p className="my-6 phone:text-sm text-lg laptop:text-xl ">
            Berikan ulasan Anda untuk membantu kami meningkatkan layanan.
          </p>
        </div>

        <div className="mt-10 w-full text-center justify-center">
          <form className="flex flex-col items-center">
            <div className="flex justify-center">
              {[...Array(5)].map((_, index) => {
                const rating = index + 1;
                return (
                  <label key={index} className="space-x-4">
                    <input
                      type="radio"
                      value={rating}
                      onClick={() => handleRatingClick(rating)}
                      className="hidden"
                    />
                    <FaStar
                      className={clsx(
                        "cursor-pointer text-4xl size-10 laptop:size-14",
                        {
                          "text-kuningNormal": rating <= (hover || starRating),
                          "text-putihDark border-kuningNormal":
                            rating > (hover || starRating),
                        },
                      )}
                      onMouseEnter={() => setHover(rating)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })}
            </div>
            {errors.rating && (
              <p className="text-merahNormal">{errors.rating.message}</p>
            )}

            <div className="mt-6 w-full px-12">
              <label
                htmlFor="message"
                className="block font-semibold text-left my-4 text-2xl phone:text-lg"
              >
                Pesan
              </label>
              <textarea
                id="message"
                className="w-full h-32 p-4 border-2 border-hitamNormal rounded-md resize-none sm:place-content-center"
                placeholder="Masukkan pesan Anda (maksimal 300 kata)"
                maxLength={300}
                {...register("message")}
              ></textarea>
              {errors.message && (
                <p className="text-merahNormal">{errors.message.message}</p>
              )}
            </div>
            <div className="w-full pb-16 px-12">
              <Button
                isLoading={loading}
                disabled={loading}
                onClick={handleSubmit(onSubmit)}
                className="w-full mt-8"
              >
                Kirim
              </Button>
            </div>
          </form>
        </div>
      </div>
      <SuccessModals
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closable
        description="Ulasan Anda telah terkirim. Terima kasih telah berbagi pendapat
            Anda!"
        withButton
      />
    </div>
  );
};

export default FeedbackPage;
