import React from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Card, CardBody } from '@chakra-ui/react';

const TutorDashboard = () => {
  return (
    <Box p={6}>
      <Heading mb={6} size="lg" textAlign="center">Tutor Dashboard</Heading>

      <VStack spacing={5} align="stretch">
        <Card>
          <CardBody>
            <HStack justify="space-between">
              <Box>
                <Text fontWeight="bold">Upcoming Sessions</Text>
                <Text fontSize="sm">View your upcoming tutoring sessions.</Text>
              </Box>
              <Button colorScheme="blue">View</Button>
            </HStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <HStack justify="space-between">
              <Box>
                <Text fontWeight="bold">Manage Availability</Text>
                <Text fontSize="sm">Set or update your available time slots.</Text>
              </Box>
              <Button colorScheme="green">Manage</Button>
            </HStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <HStack justify="space-between">
              <Box>
                <Text fontWeight="bold">Messages</Text>
                <Text fontSize="sm">Communicate with students.</Text>
              </Box>
              <Button colorScheme="purple">Open</Button>
            </HStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default TutorDashboard;
