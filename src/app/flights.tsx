import { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import * as AC from '@bacons/apple-colors';

interface Flight {
  flightNumber: string;
  airline: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    gate?: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    gate?: string;
  };
  status: 'On Time' | 'Delayed' | 'Departed' | 'Arrived' | 'Cancelled';
  aircraft?: string;
  delay?: number;
}

export default function FlightsScreen() {
  const [flightNumber, setFlightNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [flight, setFlight] = useState<Flight | null>(null);

  // Mock flight data for demonstration
  const mockFlights: Record<string, Flight> = {
    'AA123': {
      flightNumber: 'AA123',
      airline: 'American Airlines',
      departure: {
        airport: 'JFK',
        city: 'New York',
        time: '2:30 PM',
        gate: 'A12'
      },
      arrival: {
        airport: 'LAX',
        city: 'Los Angeles',
        time: '6:45 PM',
        gate: 'B8'
      },
      status: 'On Time',
      aircraft: 'Boeing 737-800'
    },
    'DL456': {
      flightNumber: 'DL456',
      airline: 'Delta Air Lines',
      departure: {
        airport: 'ATL',
        city: 'Atlanta',
        time: '9:15 AM',
        gate: 'C15'
      },
      arrival: {
        airport: 'MIA',
        city: 'Miami',
        time: '11:30 AM',
        gate: 'D22'
      },
      status: 'Delayed',
      aircraft: 'Airbus A320',
      delay: 25
    },
    'UA789': {
      flightNumber: 'UA789',
      airline: 'United Airlines',
      departure: {
        airport: 'ORD',
        city: 'Chicago',
        time: '1:00 PM',
        gate: 'E7'
      },
      arrival: {
        airport: 'SFO',
        city: 'San Francisco',
        time: '3:30 PM',
        gate: 'F14'
      },
      status: 'Departed',
      aircraft: 'Boeing 777-200'
    }
  };

  const searchFlight = async () => {
    if (!flightNumber.trim()) {
      Alert.alert('Error', 'Please enter a flight number');
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const foundFlight = mockFlights[flightNumber.toUpperCase()];

      if (foundFlight) {
        setFlight(foundFlight);
      } else {
        Alert.alert('Flight Not Found', 'No flight found with that number. Try AA123, DL456, or UA789.');
        setFlight(null);
      }

      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: Flight['status']) => {
    switch (status) {
      case 'On Time':
        return AC.systemGreen;
      case 'Delayed':
        return AC.systemOrange;
      case 'Cancelled':
        return AC.systemRed;
      case 'Departed':
        return AC.systemBlue;
      case 'Arrived':
        return AC.systemGreen;
      default:
        return AC.label;
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: AC.systemBackground }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={{ padding: 20 }}>
        {/* Header */}
        <View style={{ marginBottom: 30, alignItems: 'center' }}>
          <Image
            source="sf:airplane"
            style={{ fontSize: 48, color: AC.systemBlue, marginBottom: 12 }}
          />
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: AC.label,
              textAlign: 'center',
            }}
          >
            Flight Tracker
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: AC.secondaryLabel,
              textAlign: 'center',
              marginTop: 4,
            }}
          >
            Track your flight status in real-time
          </Text>
        </View>

        {/* Search Section */}
        <View
          style={{
            backgroundColor: AC.secondarySystemBackground,
            borderRadius: 16,
            borderCurve: 'continuous',
            padding: 20,
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: AC.label,
              marginBottom: 12,
            }}
          >
            Search Flight
          </Text>

          <TextInput
            style={{
              backgroundColor: AC.systemBackground,
              borderRadius: 12,
              borderCurve: 'continuous',
              padding: 16,
              fontSize: 16,
              color: AC.label,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: AC.separator,
            }}
            placeholder="Enter flight number (e.g., AA123)"
            placeholderTextColor={AC.placeholderText}
            value={flightNumber}
            onChangeText={setFlightNumber}
            autoCapitalize="characters"
            autoCorrect={false}
          />

          <Pressable
            style={({ pressed }) => ({
              backgroundColor: pressed ? AC.systemBlue + '80' : AC.systemBlue,
              borderRadius: 12,
              borderCurve: 'continuous',
              padding: 16,
              alignItems: 'center',
              opacity: loading ? 0.6 : 1,
            })}
            onPress={searchFlight}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                Track Flight
              </Text>
            )}
          </Pressable>
        </View>

        {/* Flight Details */}
        {flight && (
          <View
            style={{
              backgroundColor: AC.secondarySystemBackground,
              borderRadius: 16,
              borderCurve: 'continuous',
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
            }}
          >
            {/* Flight Header */}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: AC.label,
                  marginBottom: 4,
                }}
              >
                {flight.flightNumber}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: AC.secondaryLabel,
                  marginBottom: 8,
                }}
              >
                {flight.airline}
              </Text>
              <View
                style={{
                  backgroundColor: getStatusColor(flight.status) + '20',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  borderCurve: 'continuous',
                }}
              >
                <Text
                  style={{
                    color: getStatusColor(flight.status),
                    fontWeight: '600',
                    fontSize: 14,
                  }}
                >
                  {flight.status}
                  {flight.delay && ` (${flight.delay} min delay)`}
                </Text>
              </View>
            </View>

            {/* Route */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}
            >
              {/* Departure */}
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: AC.label,
                    marginBottom: 4,
                  }}
                >
                  {flight.departure.airport}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: AC.secondaryLabel,
                    marginBottom: 8,
                  }}
                >
                  {flight.departure.city}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: AC.label,
                  }}
                >
                  {flight.departure.time}
                </Text>
                {flight.departure.gate && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: AC.secondaryLabel,
                      marginTop: 4,
                    }}
                  >
                    Gate {flight.departure.gate}
                  </Text>
                )}
              </View>

              {/* Arrow */}
              <View style={{ paddingHorizontal: 20 }}>
                <Image
                  source="sf:arrow.right"
                  style={{ fontSize: 24, color: AC.systemBlue }}
                />
              </View>

              {/* Arrival */}
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: AC.label,
                    marginBottom: 4,
                  }}
                >
                  {flight.arrival.airport}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: AC.secondaryLabel,
                    marginBottom: 8,
                  }}
                >
                  {flight.arrival.city}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: AC.label,
                  }}
                >
                  {flight.arrival.time}
                </Text>
                {flight.arrival.gate && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: AC.secondaryLabel,
                      marginTop: 4,
                    }}
                  >
                    Gate {flight.arrival.gate}
                  </Text>
                )}
              </View>
            </View>

            {/* Aircraft Info */}
            {flight.aircraft && (
              <View
                style={{
                  backgroundColor: AC.tertiarySystemBackground,
                  borderRadius: 12,
                  borderCurve: 'continuous',
                  padding: 16,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: AC.secondaryLabel,
                    marginBottom: 4,
                  }}
                >
                  Aircraft
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: AC.label,
                  }}
                >
                  {flight.aircraft}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Demo Instructions */}
        <View
          style={{
            backgroundColor: AC.tertiarySystemBackground,
            borderRadius: 12,
            borderCurve: 'continuous',
            padding: 16,
            marginTop: 24,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: AC.label,
              marginBottom: 8,
            }}
          >
            Demo Instructions
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: AC.secondaryLabel,
              lineHeight: 20,
            }}
          >
            Try searching for these sample flights: AA123, DL456, or UA789 to see different flight statuses and information.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}