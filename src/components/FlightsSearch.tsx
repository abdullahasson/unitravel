'use client';

// React 
import { useState, useEffect, useCallback } from 'react';
// Next Intl
import { useTranslations } from "next-intl";
// React Library
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// Components
import FlightList from "./FlightList"
import FlightsError from './FlightsError';
// Data
import { AirportInfo , AIRPORTSARRAY } from "@/constants/data"
// Icons
import {
  CalendarDays,
  ArrowRightLeft,
  User,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
  Search,
  Loader2,
  Minus,
  Plus,
  XCircle
} from 'lucide-react';

// Define flight data structure
interface FlightData {
  flight_number: string;
  link: string;
  origin_airport: string;
  destination_airport: string;
  departure_at: string; // ISO 8601 format
  airline: string;
  destination: string;
  origin: string;
  price: number;
  return_transfers: number;
  duration: number; // in minutes
  duration_to: number;
  duration_back: number;
  transfers: number;
}

export default function FlightsSearch() {
  // Translations
  const t = useTranslations("SearchFlightsComponent")

  // Search parameters state
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState('LED');
  const [destination, setDestination] = useState('HKT');
  const [departureDate, setDepartureDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [directOnly, setDirectOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [currency, setCurrency] = useState('USD');
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPassengerSelect, setShowPassengerSelect] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define search function with useCallback
  const searchFlights = useCallback(async () => {
    if (!origin || !destination) {
      setError('Please enter origin and destination');
      return;
    }

    if (!departureDate) {
      setError('Please select departure date');
      return;
    }

    if (tripType === 'round-trip' && !returnDate) {
      setError('Please select return date');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Format dates to YYYY-MM-DD
      const formatDate = (date: Date) => date.toISOString().split('T')[0];

      const params = new URLSearchParams({
        origin,
        destination,
        currency: currency.toLowerCase(),
        departure_date: formatDate(departureDate),
        direct: directOnly.toString(),
        sort: sortBy,
        limit: '20'
      });

      if (tripType === 'round-trip' && returnDate) {
        params.append('return_date', formatDate(returnDate));
      }

      // Add passenger parameters
      params.append('adults', passengers.adults.toString());
      params.append('children', passengers.children.toString());
      params.append('infants', passengers.infants.toString());

      const apiUrl = `/api/aviasales/aviasales/v3/prices_for_dates?${params.toString()}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setFlights([]);
      } else {
        setFlights(data.data || []);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch flights';
      console.error('Flight search failed:', errorMessage);
      setError('Failed to fetch flights. Please try again.');
      setFlights([]);
    } finally {
      setLoading(false);
    }
  }, [
    origin, 
    destination, 
    departureDate, 
    tripType, 
    returnDate, 
    directOnly, 
    sortBy, 
    currency, 
    passengers
  ]);

  // Fetch flights on initial load
  useEffect(() => {
    searchFlights();
  }, [searchFlights]);

  const swapLocations = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handlePassengerChange = (type: keyof typeof passengers, delta: number) => {
    setPassengers(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <div className="max-w-6xl mx-auto p-4 -translate-y-40">
      {/* Search Form */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Location Inputs */}
          <div className="md:col-span-12 flex items-center space-x-3">
            <div className="flex-1 relative">
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg shadow-sm transition-all"
              >
                {AIRPORTSARRAY.map((airport : AirportInfo) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.country.ar} -
                    {airport.city.ar} -
                    {airport.name.ar}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>

            <button
              onClick={swapLocations}
              className="p-3 cursor-pointe bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 rounded-full transition-all duration-300 shadow-md"
              aria-label="Swap locations"
            >
              <ArrowRightLeft size={18} className="text-blue-500" />
            </button>

            <div className="flex-1 relative">
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value.toUpperCase())}
                className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg shadow-sm transition-all"
              >
                {AIRPORTSARRAY.map((airport : AirportInfo) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.country.ar} -
                    {airport.city.ar} -
                    {airport.name.ar}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Trip Type Selector */}
          <div className="md:col-span-6">
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                className={`flex-1 py-3 px-4 text-center rounded-xl transition-all duration-300 ${tripType === 'one-way'
                  ? 'bg-white shadow-md text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
                onClick={() => setTripType('one-way')}
              >
                {t('TripType.One')}
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center rounded-xl transition-all duration-300 ${tripType === 'round-trip'
                  ? 'bg-white shadow-md text-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
                onClick={() => setTripType('round-trip')}
              >
                {t("TripType.Return")}
              </button>
            </div>
          </div>

          {/* Date Pickers */}
          <div className="md:col-span-6 grid gap-3">
            <div className="col-span-1 relative">
              <DatePicker
                selected={departureDate}
                onChange={setDepartureDate}
                minDate={new Date()}
                className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg shadow-sm"
                placeholderText="Departure"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <CalendarDays className="text-blue-500" size={20} />
              </div>
            </div>

            {tripType === 'round-trip' && (
              <div className="col-span-1 relative">
                <DatePicker
                  selected={returnDate}
                  onChange={setReturnDate}
                  minDate={departureDate || new Date()}
                  className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg shadow-sm"
                  placeholderText="Return"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <CalendarDays className="text-blue-500" size={20} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="mt-2 mb-3">
          <button
            className="flex items-center text-blue-600 cursor-pointer mb-2 hover:text-blue-800 transition-colors duration-300"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <SlidersHorizontal size={18} className="mr-2" />
            <span className="font-medium">{t("AdvancedOptions")}</span>
            {showAdvanced ?
              <ChevronUp size={18} className="ml-2 transition-transform" /> :
              <ChevronDown size={18} className="ml-2 transition-transform" />
            }
          </button>

          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-4 border-gray-100 animate-fadeIn">
              {/* Currency */}
              <div className="md:col-span-3">
                <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("Currency")}</label>
                  <div className="relative">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full p-3 pl-4 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="SGD">SGD (S$)</option>
                      <option value="THB">THB (฿)</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sort by */}
              <div className="md:col-span-3">
                <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("SortBy.Title")}</label>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'price' | 'duration' | 'departure')}
                      className="w-full p-3 pl-4 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="price">{t("SortBy.Price")}</option>
                      <option value="duration">{t("SortBy.Duration")}</option>
                      <option value="departure">{t("SortBy.Departure")}</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Passengers */}
              <div className="md:col-span-3 relative">
                <div
                  className="border border-gray-200 rounded-xl p-4 pl-12 cursor-pointer hover:border-blue-400 transition-colors duration-300 bg-white shadow-sm"
                  onClick={() => setShowPassengerSelect(!showPassengerSelect)}
                >
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <User size={20} className="text-blue-500" />
                  </div>
                  <div className="font-medium text-gray-800">
                    {totalPassengers} {totalPassengers === 1 ? t("Passengers.One") : t("Passengers.More")}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {passengers.adults}A, {passengers.children}C, {passengers.infants}I
                  </div>
                </div>

                {showPassengerSelect && (
                  <div className="absolute z-20 bg-white border border-gray-200 rounded-xl shadow-lg p-5 w-full mt-2 animate-fadeIn">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-800">{t("Passengers.More")}</h3>
                      <button
                        onClick={() => setShowPassengerSelect(false)}
                        className="p-1 cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <X size={18} className="text-gray-500" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-800">{t("Passengers.Adults.Text")}</div>
                          <div className="text-sm text-gray-500">{t("Passengers.Adults.EX")}</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-blue-50 transition-colors"
                            disabled={passengers.adults <= 1}
                            onClick={() => handlePassengerChange('adults', -1)}
                          >
                            <Minus size={16} className="text-blue-500" />
                          </button>
                          <span className="font-medium w-6 text-center">{passengers.adults}</span>
                          <button
                            className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition-colors"
                            onClick={() => handlePassengerChange('adults', 1)}
                          >
                            <Plus size={16} className="text-blue-500" />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-800">{t("Passengers.Children.Text")}</div>
                          <div className="text-sm text-gray-500">{t("Passengers.Children.EX")}</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-blue-50 transition-colors"
                            disabled={passengers.children <= 0}
                            onClick={() => handlePassengerChange('children', -1)}
                          >
                            <Minus size={16} className="text-blue-500" />
                          </button>
                          <span className="font-medium w-6 text-center">{passengers.children}</span>
                          <button
                            className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition-colors"
                            onClick={() => handlePassengerChange('children', 1)}
                          >
                            <Plus size={16} className="text-blue-500" />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-800">{t("Passengers.Infants.Text")}</div>
                          <div className="text-sm text-gray-500">{t("Passengers.Infants.EX")}</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-blue-50 transition-colors"
                            disabled={passengers.infants <= 0}
                            onClick={() => handlePassengerChange('infants', -1)}
                          >
                            <Minus size={16} className="text-blue-500" />
                          </button>
                          <span className="font-medium w-6 text-center">{passengers.infants}</span>
                          <button
                            className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-blue-50 transition-colors"
                            disabled={passengers.infants >= passengers.adults}
                            onClick={() => handlePassengerChange('infants', 1)}
                          >
                            <Plus size={16} className="text-blue-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct flights */}
              <div className="md:col-span-3 flex items-center pl-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="direct"
                    checked={directOnly}
                    onChange={() => setDirectOnly(!directOnly)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-400 cursor-pointer"
                  />
                  <label htmlFor="direct" className="mx-2 block text-sm font-medium text-gray-700 cursor-pointer">
                    {t("Direct")}
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="w-full">
          <button
            onClick={searchFlights}
            disabled={loading}
            className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <Loader2 className="animate-spin h-6 w-6" />
            ) : (
              <div className="flex items-center">
                <Search size={20} className="mr-2" />
                <span className="font-medium">{t("SearchButton")}</span>
              </div>
            )}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-5 p-4 bg-red-50 text-red-700 rounded-xl flex items-center animate-fadeIn border border-red-100">
            <XCircle className="text-red-500 mr-3" size={20} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Results Section */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
        </div>
      ) : flights.length > 0 ? (
        <FlightList
          flights={flights}
          currency={currency}
          destination={destination}
          tripType={tripType}
          returnDate={returnDate}
          departureDate={departureDate}
          totalPassengers={totalPassengers}
          originNow={origin}
        />
      ) : !loading && (
        <FlightsError />
      )}
    </div>
  );
}