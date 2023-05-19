function CopyWrite() {
  return (
    <footer className="fixed bottom-0 min-w-full w-[100%] flex justify-center items-center flex-grow bg-black mx-auto whitespace-nowrap">
      <div className="container flex flex-row items-center justify-center py-4 bg-black w-[140%] whitespace-nowrap">
        <div className="flex flex-wrap text-white font-medium">
          <p>
            © 2023
            <a
              href="https://www.ibassemtarek.com/"
              target="_blank"
              className="hover:text-gray-400"
            >
              {" "}
              IbassemTarek
            </a>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default CopyWrite;
