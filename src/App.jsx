import { useState } from 'react'
import { Button, Box, Text, Image, Stack } from '@chakra-ui/react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box textAlign="center" p={5}>
      {/* Chakra UI components */}
      <Stack direction="row" spacing={4} justify="center" mb={6}>
        <Button colorScheme="blue" onClick={() => setCount(count + 1)} size="lg">
          Count is {count}
        </Button>
      </Stack>

      {/* Regular HTML */}
      <h1>This is a regular HTML heading</h1>
      <p>This is a paragraph in HTML. Chakra UI components are optional!</p>

      {/* Chakra UI component */}
      <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm" mb={6}>
        <Text>Chakra Box Component Here!</Text>
      </Box>

      {/* HTML element with Chakra UI styling */}
      <div style={{ backgroundColor: 'lightblue', padding: '20px' }}>
        This is a regular HTML div styled with inline CSS.
      </div>
    </Box>
  )
}

export default App
