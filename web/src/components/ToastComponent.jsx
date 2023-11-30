import { ToastContainer } from "react-toastify";

function ToastComponent() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1000}
      limit={3}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="dark"
    />
  );
}

export default ToastComponent;
