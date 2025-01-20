const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md z-[9999]">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Logo</h1>
      </div>
      <nav className="mt-6">
        <ul>
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Menu 1</li>
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Menu 2</li>
          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Menu 3</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
