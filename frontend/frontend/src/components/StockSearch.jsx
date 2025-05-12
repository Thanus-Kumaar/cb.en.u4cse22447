import { useState } from 'react'
import axios from 'axios'

export default function StockSearch() {
  const [ticker, setTicker] = useState('')
  const [data, setData] = useState(null)

  const fetchStock = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/stocks/${ticker}`)
      setData(res.data)
    } catch (err) {
      console.error(err)
      setData(null)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Stock Search</h2>
      <input
        className="border p-2 mr-2"
        placeholder="Enter Ticker (e.g. AAPL)"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={fetchStock}>
        Search
      </button>
      {data && (
        <pre className="bg-gray-100 mt-4 p-2 rounded text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}
