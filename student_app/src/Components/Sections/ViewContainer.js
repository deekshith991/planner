import ListView from "./ListView";

const ViewContainer = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'list':
        return <ListView></ListView>;
      case 'calendar':
        return <div>Your Calendar Content</div>;
      case 'pomodoro':
        return <div>Your Pomodoro Content</div>;
      case 'assignments':
        return <div>Your Assignments Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      {renderContent()}
    </div>
  );
}

export default ViewContainer;
