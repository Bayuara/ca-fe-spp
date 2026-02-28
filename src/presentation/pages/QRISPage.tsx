import React, { useEffect } from "react";
import LogoQRIS from "../assets/QRIS.svg";
import LOGO from "../assets/Logo.svg";
import ovo from "../assets/ovo.svg";
import shoppepay from "../assets/ShopeePay.svg";
import dana from "../assets/dana.svg";
import gopay from "../assets/gopay.svg";
import Button from "@/presentation/components/common/Button";
import { useLayout } from "@/presentation/components/hooks/useLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import SppService from "@/services/sppServices";

const QRISPage: React.FC = () => {
  const { setHideLayout } = useLayout();
  const { state } = useLocation();
  const { ids } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const sppIds = ids?.split(",").map(Number) || [];
  //       const sppPromises = sppIds.map((id) => SppService.getById(id));
  //       const sppResponses = await Promise.all(sppPromises);
  //       // console.log("response sppResponses: ", sppResponses);
  //       const payUrls = sppResponses.map((response) => response.data.payUrl);
  //       console.log("response payUrls: ", payUrls);
  //       const payUrl = payUrls[0];
  //       console.log("response payUrl: ", payUrl);
  //     } catch (err) {
  //       console.error("Error fetching data:", err);
  //       toast.error("Terjadi kesalahan");
  //     }
  //   };
  //   if (ids) fetchData();
  // }, [ids]);

  const { expiredTime, totalAmount, payUrl } = state;

  // console.log("payurl: ", payUrl);

  // const fetchDownloadQris = async () => await SppService.getQrisImg(payUrl);
  // console.log(fetchDownloadQris);

  useEffect(() => {
    setHideLayout(true);

    return () => {
      setHideLayout(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackClick = () => {
    navigate("/spp");
  };

  const formattedExpiredTime = expiredTime
    ? new Date(expiredTime).toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  // console.log(formattedExpiredTime);

  // Function to download the blob as a file
  // const handleQrisDownload = (): Promise<Blob> => {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.crossOrigin = "anonymous"; // This is crucial for cross-origin images
  //     img.src = `${payUrl}`; // Replace with the actual image URL

  //     console.log("img handleQrisDownload: ", img);

  //     img.onload = () => {
  //       const canvas = document.createElement("canvas");
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       const ctx = canvas.getContext("2d");

  //       if (!ctx) {
  //         reject(new Error("Failed to get 2D context"));
  //         return;
  //       }

  //       ctx.drawImage(img, 0, 0);

  //       canvas.toBlob((blob) => {
  //         if (blob) {
  //           resolve(blob); // Resolves the blob for the file downloader
  //         } else {
  //           reject(new Error("Failed to create blob"));
  //         }
  //       }, "image/png");
  //     };

  //     img.onerror = () => {
  //       reject(new Error("Failed to load image"));
  //     };
  //   });
  // };

  // const link = document.createElement("a");
  // link.href = imgSrc;
  // link.target = "_blank"; // Open the image in a new tab
  // link.download = "QRIS-SPPKu.jpeg";
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link); // Clean up the DOM

  // const handleQrisDownload = async () => {
  //   const imgSrc = `${payUrl}`; // Replace with the actual image URL

  //   try {
  //     const response = await fetch(imgSrc); // Fetch the image
  //     const blob = await response.blob(); // Create a Blob from the image data

  //     const link = document.createElement("a");
  //     const url = URL.createObjectURL(blob); // Create a URL for the Blob
  //     link.href = url;
  //     link.download = "QRIS-SPPKu.jpeg"; // Set filename for download
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link); // Clean up the DOM
  //     URL.revokeObjectURL(url); // Revoke the Blob URL to free memory
  //   } catch (error) {
  //     console.error("Error downloading the image:", error);
  //   }
  // };

  // async function handleQrisDownload() {
  //   const image = await fetch(`${payUrl}?not-from-cache-please`);
  //   const imageUrl = URL.createObjectURL(await image.blob());

  //   const link = document.createElement("a");
  //   link.href = imageUrl;
  //   link.target = "_blank"; // Open the image in a new tab
  //   link.download = "QRIS-SPPKu.jpeg"; // Set filename for download
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link); // Clean up the DOM
  //   URL.revokeObjectURL(imageUrl); // Revoke the Blob URL to free memory
  // }

  // // Step 1: Get the image element
  // const img = document.getElementById("myImage");

  // // Step 2: Create a canvas and draw the image on it
  // const canvas = document.createElement("canvas");
  // canvas.width = img.width;
  // canvas.height = img.height;
  // const ctx = canvas.getContext("2d");
  // ctx.drawImage(img, 0, 0);

  // // Step 3: Convert the canvas to a Blob
  // canvas.toBlob((blob) => {
  //   // Do something with the blob, e.g., upload it or create a URL
  //   const url = URL.createObjectURL(blob);
  //   console.log(url);
  // }, "image/png");

  // const handleQrisDownload = async () => {
  //   const img = document.getElementById("qris") as HTMLImageElement | null;

  //   if (!img) {
  //     console.error("Image not found");
  //     return; // Exit the function if img is null
  //   }

  //   const canvas = document.createElement("canvas");
  //   canvas.width = img.width;
  //   canvas.height = img.height;
  //   const ctx = canvas.getContext("2d");

  //   if (!ctx) {
  //     console.error("Failed to get 2D context");
  //     return; // Exit the function if ctx is null
  //   }

  //   ctx.drawImage(img, 0, 0);

  //   const canvasToBlob = (): Promise<Blob | null> => {
  //     return new Promise((resolve) => {
  //       canvas.toBlob((blob) => {
  //         resolve(blob);
  //       }, "image/png");
  //     });
  //   };

  // Function to download the blob as a file
  // function handleImgDownload() {
  //   const img = document.getElementById("qris") as HTMLImageElement | null;
  //   console.log("img: ", img);

  //   if (!img) {
  //     toast.error("Image not found");
  //     return; // Exit the function if img is null
  //   }

  //   const canvas = document.createElement("canvas");
  //   canvas.width = img.width;
  //   img.crossOrigin = "anonymous"; // Allow cross-origin requests
  //   canvas.height = img.height;
  //   const ctx = canvas.getContext("2d");

  //   if (ctx) {
  //     ctx.drawImage(img, 0, 0);

  //     canvas.toBlob((blob: Blob | null) => {
  //       if (blob) {
  //         const url = URL.createObjectURL(blob);
  //         console.log("URL: " + url);
  //       } else {
  //         console.error("Blob conversion failed.");
  //         toast.error("Blob conversion failed.");
  //       }
  //     }, "image/png");
  //   } else {
  //     console.error("Failed to get 2D context");
  //     toast.error("Failed to get 2D context");
  //   }
  // }

  // const handleDownload = async () => {
  //   try {
  //     const sppIds = ids?.split(",").map(Number) || [];
  //     const sppPromises = sppIds.map((id) => SppService.getById(id));
  //     const sppResponses = await Promise.all(sppPromises);
  //     const payUrls = sppResponses.map((response) => response.data.payUrl);
  //     const fetchedPayUrl = payUrls[0];

  //     console.log("fetchedPayUrl: " + fetchedPayUrl);

  //     if (!fetchedPayUrl) {
  //       throw new Error("Pay URL not found");
  //     }

  //     // Fetch the image from the URL and convert it to a Blob
  //     const response = await fetch(fetchedPayUrl);
  //     const blob = await response.blob();

  //     // Create a temporary link element for downloading
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = "QRIS.png"; // Nama file yang akan di-download
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);

  //     // Cleanup the object URL after download
  //     URL.revokeObjectURL(url);

  //     // setPayUrl(fetchedPayUrl);
  //   } catch (err) {
  //     console.error("Error fetching or downloading data:", err);
  //     toast.error("Terjadi kesalahan saat mengunduh gambar.");
  //   }
  // };

  const handleDownload = async () => {
    try {
      const sppIds = ids?.split(",").map(Number) || [];
      const id = sppIds[0];
      const sppResponse = await SppService.getById(id);
      // const sppPromises = sppIds.map((id) => SppService.getById(id));
      // const sppResponses = await Promise.all(sppPromises);
      // const payUrls = sppResponses.map((response) => response.data.payUrl);
      // const fetchedPayUrl = payUrls[0];

      const payUrl = sppResponse.data.payUrl;

      console.log("fetchedPayUrl: " + payUrl);

      if (!payUrl) {
        throw new Error("Pay URL not found");
      }

      // Fetch the image from the URL and convert it to a Blob
      const response = await fetch(payUrl);
      const blob = await response.blob();

      // Create a temporary link element for downloading
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "QRIS.png"; // Nama file yang akan di-download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup the object URL after download
      URL.revokeObjectURL(url);

      // setPayUrl(fetchedPayUrl);
    } catch (err) {
      console.error("Error fetching or downloading data:", err);
      toast.error("Terjadi kesalahan saat mengunduh gambar.");
    }
  };

  return (
    <div className="bg-putihNormal min-h-screen flex flex-col items-center py-8 px-12">
      {/* LogoQRIS outside the container */}
      <div className="w-full pb-4">
        <img src={LogoQRIS} alt="qris" />
      </div>

      {/* Main content container */}
      <div className="bg-putihLight p-6 rounded-lg shadow-lg text-center max-w-md w-full">
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="text-sm font-medium">Access by</span>
          <img src={LOGO} alt="logo" className="w-8" />
        </div>
        <p className="text-lg font-semibold mb-2">
          Pembayaran Sumbangan Pembinaan Pendidikan (SPP)
        </p>
        <div className="text-black text-4xl font-bold mb-4">
          Rp. {totalAmount?.toLocaleString("id-ID")}
        </div>
        <div className="mb-6">
          {/* QR Code */}
          <div className="bg-white p-4 border rounded-lg inline-block">
            {payUrl ? (
              <>
                <div className="flex justify-center">
                  <img
                    src={payUrl}
                    alt="QR Code"
                    id="qris"
                    className="size-64"
                  />
                </div>
                {/* <p className="text-sm text-gray-600 mt-2 break-all">{payUrl}</p> */}
              </>
            ) : (
              <p>QR Code tidak tersedia.</p>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Berlaku hingga: {formattedExpiredTime}
          </p>
          <p className="text-sm text-gray-600">
            Menerima Pembayaran melalui aplikasi dibawah ini
          </p>
        </div>
        <div className="flex justify-center gap-4 mb-6">
          <img src={dana} className="size-14 laptop:size-20" />
          <img src={gopay} className="size-14 laptop:size-20" />
          <img src={ovo} className="size-14 laptop:size-20" />
          <img src={shoppepay} className="size-14 laptop:size-20" />
        </div>
      </div>

      {/* Buttons outside the container */}
      <div className="w-full mt-6 space-y-4">
        {/* <Button block onClick={handleImgDownload}> */}
        <Button block onClick={handleDownload}>
          Unduh QRIS
        </Button>
        {/* fetchData={SppService.getById(id)} */}
        {/* <FileDownloader
          block
          fetchData={handleQrisDownload}
          // fetchData={handleImgDownload}
          fileName="QRIS SPPKu.jpeg"
          label="Unduh QRIS FileDownloader"
        /> */}
        <Button variant="outline" block onClick={handleBackClick}>
          Kembali
        </Button>
      </div>
    </div>
  );
};

export default QRISPage;
