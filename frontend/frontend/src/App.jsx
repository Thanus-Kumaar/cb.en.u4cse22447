import { Container, Typography, Divider } from '@mui/material'
import StockSearch from './components/StockSearch'
import StockCorrelation from './components/StockCorrelation'

function App() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Stock Dashboard
      </Typography>
      <StockSearch />
      <Divider sx={{ my: 4 }} />
      <StockCorrelation />
    </Container>
  )
}

export default App
