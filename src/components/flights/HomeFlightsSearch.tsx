'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Select from '../ui/select';
import UiDatePicker from '../ui/datepicker';
import { AIRPORTSARRAY } from "@/constants/data";
import {
  ArrowRightLeft,
  User,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
  Search,
  Minus,
  Plus,
  XCircle
} from 'lucide-react';

// Passenger Selector Component
const PassengerSelector = ({ 
  passengers, 
  onChange,
  onClose
}: {
  passengers: { adults: number; children: number; infants: number };
  onChange: (type: 'adults' | 'children' | 'infants', delta: number) => void;
  onClose: () => void;
}) => {
  const t = useTranslations("SearchFlightsComponent");
  
  return (
    <div className="absolute z-20 bg-white border border-gray-200 rounded-xl shadow-lg p-5 w-full mt-2 animate-fadeIn">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">{t("Passengers.More")}</h3>
        <button
          onClick={onClose}
          className="p-1 cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      <div className="space-y-4">
        {(['adults', 'children', 'infants'] as const).map((type) => (
          <div key={type} className="flex justify-between items-center">
            <div>
              <div className="font-medium text-gray-800">
                {t(`Passengers.${type.charAt(0).toUpperCase() + type.slice(1)}.Text`)}
              </div>
              <div className="text-sm text-gray-500">
                {t(`Passengers.${type.charAt(0).toUpperCase() + type.slice(1)}.EX`)}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-blue-50 transition-colors"
                disabled={
                  (type === 'adults' && passengers[type] <= 1) || 
                  (type !== 'adults' && passengers[type] <= 0)
                }
                onClick={() => onChange(type, -1)}
              >
                <Minus size={16} className="text-blue-500" />
              </button>
              <span className="font-medium w-6 text-center">{passengers[type]}</span>
              <button
                className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition-colors"
                disabled={type === 'infants' && passengers[type] >= passengers.adults}
                onClick={() => onChange(type, 1)}
              >
                <Plus size={16} className="text-blue-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Define form state types
type TripType = 'one-way' | 'round-trip';
type SortBy = 'price' | 'duration' | 'departure';

export default function HomeFlightsSearch() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("SearchFlightsComponent");
  
  // Form state
  const [formState, setFormState] = useState({
    origin: '',
    destination: '',
    departureDate: new Date() as Date | null,
    returnDate: null as Date | null,
    tripType: 'one-way' as TripType,
    directOnly: false,
    sortBy: 'price' as SortBy,
    currency: 'USD',
    passengers: { adults: 1, children: 0, infants: 0 }
  });
  
  // UI state
  const [uiState, setUiState] = useState({
    showAdvanced: false,
    showPassengerSelect: false,
    error: ''
  });

  // Handle input changes with proper typing
  const handleInputChange = <K extends keyof typeof formState>(
    field: K,
    value: typeof formState[K]
  ) => {
    setFormState(prev => ({ 
      ...prev, 
      [field]: value,
      ...(field === 'tripType' && value === 'one-way' ? { returnDate: null } : {})
    }));
  };

  // Handle passenger changes
  const handlePassengerChange = (type: keyof typeof formState.passengers, delta: number) => {
    setFormState(prev => ({
      ...prev,
      passengers: {
        ...prev.passengers,
        [type]: Math.max(0, prev.passengers[type] + delta)
      }
    }));
  };

  // Swap origin and destination
  const swapLocations = () => {
    setFormState(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  // Form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const { origin, destination, departureDate, tripType, returnDate } = formState;
    
    // Validation
    if (!origin || !destination) {
      setUiState(prev => ({ ...prev, error: t("Error.origin") }));
      return;
    }

    if (!departureDate) {
      setUiState(prev => ({ ...prev, error: t("Error.departureDate") }));
      return;
    }

    if (tripType === 'round-trip' && !returnDate) {
      setUiState(prev => ({ ...prev, error: t("Error.returnDate") }));
      return;
    }

    setUiState(prev => ({ ...prev, error: '' }));

    // Format dates
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const params = new URLSearchParams({
      origin,
      destination,
      currency: formState.currency.toLowerCase(),
      departure_date: formatDate(departureDate),
      direct: formState.directOnly.toString(),
      sort: formState.sortBy,
      limit: '20',
      adults: formState.passengers.adults.toString(),
      children: formState.passengers.children.toString(),
      infants: formState.passengers.infants.toString()
    });

    if (tripType === 'round-trip' && returnDate) {
      params.append('return_date', formatDate(returnDate));
    }

    router.push(`/${locale}/flights?${params.toString()}`);
  };

  // Calculate total passengers
  const totalPassengers = Object.values(formState.passengers).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Location Inputs */}
          <div className="md:col-span-12 flex items-center space-x-3">
            <div className="flex-1 relative">
              <Select
                options={AIRPORTSARRAY.map(airport => ({
                  value: airport.code.toUpperCase(),
                  label: `${airport.country.ar} - ${airport.city.ar} - ${airport.name.ar}`
                }))}
                value={formState.origin}
                onChange={(value) => handleInputChange('origin', value)}
                placeholder="origin"
                className="text-lg"
              />
            </div>

            <button
              type="button"
              onClick={swapLocations}
              className="p-3 cursor-pointer bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 rounded-full transition-all duration-300 shadow-md"
              aria-label="SwapLocations"
            >
              <ArrowRightLeft size={18} className="text-blue-500" />
            </button>

            <div className="flex-1 relative">
              <Select
                options={AIRPORTSARRAY.map(airport => ({
                  value: airport.code.toUpperCase(),
                  label: `${airport.country.ar} - ${airport.city.ar} - ${airport.name.ar}`
                }))}
                value={formState.destination}
                onChange={(value) => handleInputChange('destination', value)}
                placeholder="destination"
                className="text-lg"
              />
            </div>
          </div>

          {/* Trip Type Selector */}
          <div className="md:col-span-6">
            <div className="flex bg-gray-100 rounded-xl p-1">
              {(['one-way', 'round-trip'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`flex-1 py-3 px-4 text-center rounded-xl transition-all duration-300 ${
                    formState.tripType === type
                      ? 'bg-white shadow-md text-blue-600 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => handleInputChange('tripType', type)}
                >
                  {t(`TripType.${type === 'one-way' ? 'One' : 'Return'}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Date Pickers */}
          <div className="md:col-span-6 flex gap-3">
            <div className="flex-1 relative">
              <UiDatePicker
                selected={formState.departureDate}
                onChange={(date) => handleInputChange('departureDate', date)}
                minDate={new Date()}
                placeholderText={t("Date.Departure")}
                className="w-full"
              />
            </div>

            {formState.tripType === 'round-trip' && (
              <div className="flex-1 relative">
                <UiDatePicker
                  selected={formState.returnDate}
                  onChange={(date) => handleInputChange('returnDate', date)}
                  minDate={formState.departureDate || new Date()}
                  placeholderText={t("Date.Return")}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="mt-2 mb-3">
          <button
            type="button"
            className="flex items-center text-blue-600 cursor-pointer mb-2 hover:text-blue-800 transition-colors duration-300"
            onClick={() => setUiState(prev => ({ ...prev, showAdvanced: !prev.showAdvanced }))}
          >
            <SlidersHorizontal size={18} className="mr-2" />
            <span className="font-medium">{t("AdvancedOptions")}</span>
            {uiState.showAdvanced ? (
              <ChevronUp size={18} className="ml-2 transition-transform" />
            ) : (
              <ChevronDown size={18} className="ml-2 transition-transform" />
            )}
          </button>

          {uiState.showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-4 border-gray-100 animate-fadeIn">
              {/* Currency */}
              <div className="md:col-span-3">
                <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Currency")}
                  </label>
                  <div className="relative">
                    <Select
                      options={[
                        { value: 'USD', label: 'USD ($)' },
                        { value: 'EUR', label: 'EUR (€)' },
                        { value: 'GBP', label: 'GBP (£)' },
                        { value: 'SGD', label: 'SGD (S$)' },
                        { value: 'THB', label: 'THB (฿)' },
                      ]}
                      value={formState.currency}
                      onChange={(value) => handleInputChange('currency', value)}
                      placeholder="Currency"
                    />
                  </div>
                </div>
              </div>

              {/* Sort by */}
              <div className="md:col-span-3">
                <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("SortBy.Title")}
                  </label>
                  <div className="relative">
                    <Select
                      options={[
                        { value: 'price', label: t("SortBy.Price") },
                        { value: 'duration', label: t("SortBy.Duration") },
                        { value: 'departure', label: t("SortBy.Departure") },
                      ]}
                      value={formState.sortBy}
                      onChange={(value) => handleInputChange('sortBy', value as SortBy)}
                      placeholder="SortBy"
                    />
                  </div>
                </div>
              </div>

              {/* Passengers */}
              <div className="md:col-span-3 relative">
                <div
                  className="border border-gray-200 rounded-xl p-4 pl-12 cursor-pointer hover:border-blue-400 transition-colors duration-300 bg-white shadow-sm"
                  onClick={() => setUiState(prev => ({ ...prev, showPassengerSelect: !prev.showPassengerSelect }))}
                >
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <User size={20} className="text-blue-500" />
                  </div>
                  <div className="font-medium text-gray-800">
                    {totalPassengers} {totalPassengers === 1 ? t("Passengers.One") : t("Passengers.More")}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {formState.passengers.adults}A, {formState.passengers.children}C, {formState.passengers.infants}I
                  </div>
                </div>

                {uiState.showPassengerSelect && (
                  <PassengerSelector
                    passengers={formState.passengers}
                    onChange={handlePassengerChange}
                    onClose={() => setUiState(prev => ({ ...prev, showPassengerSelect: false }))}
                  />
                )}
              </div>

              {/* Direct flights */}
              <div className="md:col-span-3 flex items-center pl-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="direct"
                    checked={formState.directOnly}
                    onChange={(e) => handleInputChange('directOnly', e.target.checked)}
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
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <div className="flex items-center">
              <Search size={20} className="mr-2" />
              <span className="font-medium">{t("SearchButton")}</span>
            </div>
          </button>
        </div>

        {/* Error message */}
        {uiState.error && (
          <div className="mt-5 p-4 bg-red-50 text-red-700 rounded-xl flex items-center animate-fadeIn border border-red-100">
            <XCircle className="text-red-500" size={20} />
            <span className="mx-2">{uiState.error}</span>
          </div>
        )}
      </form>
    </div>
  );
}