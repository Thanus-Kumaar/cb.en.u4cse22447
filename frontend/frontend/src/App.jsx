import StockSearch from './components/StockSearch'
import StockCorrelation from './components/StockCorrelation'

function App() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Stock Analysis Dashboard</h1>
      <StockSearch />
      <StockCorrelation />
    </div>
  )
}

export default App
