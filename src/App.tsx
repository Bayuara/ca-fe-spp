import React from "react";
// import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { Toaster } from "./components/ui/sonner";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./components/routes/routes";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <>
      <div className="App"></div>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors closeButton />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
};

export default App;
