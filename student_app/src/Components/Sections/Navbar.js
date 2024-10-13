

const Navbar = ({ activeTab, setActiveTab }) => {

  return (
    <div className=" max-w-full bg-white h-12 flex flex-row justify-around ">

      <Tab active={activeTab === 'list'} onClick={() => setActiveTab('list')}>List</Tab>
      <Tab active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')}>Calendar</Tab>
      <Tab active={activeTab === 'pomodoro'} onClick={() => setActiveTab('pomodoro')}>Pomodoro</Tab>
      <Tab active={activeTab === 'assignments'} onClick={() => setActiveTab('assignments')}>Assignments</Tab>

    </div>
  )
}

const Tab = ({ children, onClick, active }) => {
  return (
    <button
      className={`flex-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-center py-2 ${active ? 'font-bold' : ''
        }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Navbar;
