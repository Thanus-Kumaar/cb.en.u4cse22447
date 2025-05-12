import { useState } from 'react'
import axios from 'axios'
import { TextField, Button, Typography, Paper } from '@mui/material'

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
    } catch (error) {
      console.error(error)
      setResult(null)
    }
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>Stock Correlation</Typography>
      <TextField
        label="Ticker 1"
        value={ticker1}
        onChange={(e) => setTicker1(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mr: 2 }}
      />
      <TextField
        label="Ticker 2"
        value={ticker2}
        onChange={(e) => setTicker2(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mr: 2 }}
      />
      <Button variant="contained" color="success" onClick={fetchCorrelation}>Get Correlation</Button>

      {result && (
        <Paper elevation={2} sx={{ mt: 3, p: 2 }}>
          <Typography variant="subtitle1">Result:</Typography>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
        </Paper>
      )}
    </div>
  )
}
