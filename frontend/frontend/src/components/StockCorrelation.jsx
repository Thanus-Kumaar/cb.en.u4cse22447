import { useState } from 'react'
import axios from 'axios'

export default function StockCorrelation() {
  const [ticker1, setTicker1] = useState('')
  const [ticker2, setTicker2] = useState('')
  const [result, setResult] = useState(null)

  const fetchCorrelation = async () => {
    try {
      const res = await axios.post('http://localhost:3000/stockcorrelation', {
        ticker1,
        ticker2,
      })
      setResult(res.data)
    } catch (err) {
      console.error(err)
      setResult(null)
    }
  }

  return (
    <div className="p-4 mt-8">
      <h2 className="text-xl font-semibold mb-2">Stock Correlation</h2>
      <input
        className="border p-2 mr-2"
        placeholder="Ticker 1"
        value={ticker1}
        onChange={(e) => setTicker1(e.target.value)}
      />
      <input
        className="border p-2 mr-2"
        placeholder="Ticker 2"
        value={ticker2}
        onChange={(e) => setTicker2(e.target.value)}
      />
      <button className="bg-green-500 text-white px-4 py-2" onClick={fetchCorrelation}>
        Get Correlation
      </button>
      {result && (
        <pre className="bg-gray-100 mt-4 p-2 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  )
}
