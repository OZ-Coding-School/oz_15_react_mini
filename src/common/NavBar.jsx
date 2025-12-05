const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">OZ영화관</h1>
        <input type="text" className="bg-white rounded-[20px] h-8 w-[700px]" />
        <div className="flex w-[250px] justify-between">
          <button className="text-white bg-purple-800 rounded-[5px] w-30 h-10">
            로그인
          </button>
          <button className="text-white bg-purple-800 rounded-[5px] w-30 h-10 ">
            회원가입
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
