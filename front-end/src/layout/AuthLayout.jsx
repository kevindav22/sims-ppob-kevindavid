const AuthLayout = ({ children }) => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex w-full h-full">
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center px-12 md:px-24 bg-white">
          <div className="w-full max-w-md">{children}</div>
        </div>
        <div className="hidden lg:flex w-1/2 h-full bg-[#fff1f0] items-center justify-center">
          <img src="/Illustrasi Login.png" alt="Illustration" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
