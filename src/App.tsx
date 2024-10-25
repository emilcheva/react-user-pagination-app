import AppProviders from "./AppProviders";
import Users from "./components/Users";

function App() {
  return (
    <AppProviders>
      <div className="item-center flex min-h-screen w-full flex-col justify-center bg-main-gradient py-4 md:p-0">
        <Users />
      </div>
    </AppProviders>
  );
}

export default App;
