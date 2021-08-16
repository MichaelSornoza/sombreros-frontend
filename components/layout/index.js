import SideBar from "./SideBar";

const Index = ({ user, children }) => {
  return (
    <div className='general'>
      <SideBar user={user} />
      <section className='home-section'>{children}</section>
    </div>
  );
};

export default Index;
