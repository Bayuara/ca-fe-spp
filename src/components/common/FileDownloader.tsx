import { useState } from "react";
import { toast } from "sonner";
import useWrapInvalidToken from "../hooks/useWrapInvalidToken";
import Button, { ButtonProps } from "./Button";

interface IFileDownloaderProps extends Partial<ButtonProps> {
  fetchData: () => Promise<Blob>;
  fileName: string;
  label?: string;
}

function FileDownloader(props: IFileDownloaderProps) {
  const { fetchData, fileName, label, className, children, ...otherProps } =
    props;
  const [isLoading, setIsLoading] = useState(false);

  const wrappedFetchData = useWrapInvalidToken(fetchData);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const blob = await wrappedFetchData();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      const { message } = error as Error;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      isLoading={isLoading}
      onClick={handleClick}
      className={className}
      {...otherProps}
    >
      {label ?? children ?? "Download"}
    </Button>
  );
}

export default FileDownloader;
