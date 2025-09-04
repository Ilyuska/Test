import { Shareholders } from "./components/Shareholders";

const App: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        width: "80vw",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2 style={{fontFamily: 'Manrope'}}>Структура акционеров</h2>
      <Shareholders />
    </div>
  );
};

export default App;
