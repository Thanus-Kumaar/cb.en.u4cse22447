import { useState } from 'react'
import axios from 'axios'
import { TextField, Button, Typography, Paper } from '@mui/material'

export default function StockSearch() {
  const [ticker, setTicker] = useState('')
  const [data, setData] = useState(null)

  const fetchStock = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/stocks/${ticker}`)
      setData(res.data)
    } catch (error) {
      console.error(error)
      setData(null)
    }
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>Stock Search</Typography>
      <TextField
        label="Ticker Symbol"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mr: 2 }}
      />
      <Button variant="contained" onClick={fetchStock}>Search</Button>

      {data && (
        <Paper elevation={2} sx={{ mt: 3, p: 2 }}>
          <Typography variant="subtitle1">Result:</Typography>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
        </Paper>
      )}
    </div>
  )
}
