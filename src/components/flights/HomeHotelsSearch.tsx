// src/components/HomeHotelsSearch.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import UiDatePicker from '../ui/datepicker';
import HotelLocationSelect from '../ui/hotel-location-select'; // New component for hotel destinations
import {
  User,
  X,
  Search,
  Minus,
  Plus,
  XCircle,
  Calendar
} from 'lucide-react';

// Guest & Room Selector Component
const GuestRoomSelector = ({
  guests,
  rooms,
  onChange,
  onClose
}: {
  guests: { adults: number; children: number };
  rooms: number;
  onChange: (type: 'adults' | 'children' | 'rooms', delta: number) => void;
  onClose: () => void;
}) => {
  const t = useTranslations("SearchHotelsComponent");

  return (
    <div className="absolute z-20 bg-white border border-gray-200 rounded-xl shadow-lg p-5 w-full mt-2 animate-fadeIn">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">{t("GuestsRooms.Title")}</h3>
        <button
          onClick={onClose}
          className="p-1 cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Adults */}
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-gray-800">
              {t("GuestsRooms.Adults")}
            </div>
            <div className="text-sm text-gray-500">
              {t("GuestsRooms.AdultsEx")}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-blue-50 transition-colors"
              disabled={guests.adults <= 1}
              onClick={() => onChange('adults', -1)}
            >
              <Minus size={16} className="text-blue-500" />
            </button>
            <span className="font-medium w-6 text-center">{guests.adults}</span>
            <button
              className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition-colors"
              onClick={() => onChange('adults', 1)}
            >
              <Plus size={16} className="text-blue-500" />
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-gray-800">
              {t("GuestsRooms.Children")}
            </div>
            <div className="text-sm text-gray-500">
              {t("GuestsRooms.ChildrenEx")}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-blue-50 transition-colors"
              disabled={guests.children <= 0}
              onClick={() => onChange('children', -1)}
            >
              <Minus size={16} className="text-blue-500" />
            </button>
            <span className="font-medium w-6 text-center">{guests.children}</span>
            <button
              className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition-colors"
              onClick={() => onChange('children', 1)}
            >
              <Plus size={16} className="text-blue-500" />
            </button>
          </div>
        </div>

        {/* Rooms */}
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-gray-800">
              {t("GuestsRooms.Rooms")}
            </div>
            <div className="text-sm text-gray-500">
              {t("GuestsRooms.RoomsEx")}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:bg-blue-50 transition-colors"
              disabled={rooms <= 1}
              onClick={() => onChange('rooms', -1)}
            >
              <Minus size={16} className="text-blue-500" />
            </button>
            <span className="font-medium w-6 text-center">{rooms}</span>
            <button
              className="w-9 h-9 cursor-pointer rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition-colors"
              onClick={() => onChange('rooms', 1)}
            >
              <Plus size={16} className="text-blue-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomeHotelsSearch() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("SearchHotelsComponent");

  // Form state
  const [formState, setFormState] = useState({
    destination: '',
    checkIn: new Date() as Date | null,
    checkOut: new Date(new Date().setDate(new Date().getDate() + 3)) as Date | null,
    guests: { adults: 2, children: 0 },
    rooms: 1,
    cancellation: false,
    currency: 'USD',
  });

  // UI state
  const [uiState, setUiState] = useState({
    showGuestRoomSelect: false,
    error: ''
  });

  // Handle input changes
  const handleInputChange = <K extends keyof typeof formState>(
    field: K,
    value: typeof formState[K]
  ) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle guest/room changes
  const handleGuestRoomChange = (type: 'adults' | 'children' | 'rooms', delta: number) => {
    setFormState(prev => {
      if (type === 'rooms') {
        return {
          ...prev,
          rooms: Math.max(1, prev.rooms + delta)
        };
      } else {
        return {
          ...prev,
          guests: {
            ...prev.guests,
            [type]: Math.max(0, prev.guests[type] + delta)
          }
        };
      }
    });
  };

  // Form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { destination, checkIn, checkOut } = formState;

    // Validation
    if (!destination) {
      setUiState(prev => ({ ...prev, error: t("Error.destination") }));
      return;
    }

    if (!checkIn) {
      setUiState(prev => ({ ...prev, error: t("Error.checkIn") }));
      return;
    }

    if (!checkOut) {
      setUiState(prev => ({ ...prev, error: t("Error.checkOut") }));
      return;
    }

    setUiState(prev => ({ ...prev, error: '' }));

    // Format dates
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const params = new URLSearchParams({
      destination,
      currency: formState.currency.toLowerCase(),
      check_in: formatDate(checkIn),
      check_out: formatDate(checkOut),
      adults: formState.guests.adults.toString(),
      children: formState.guests.children.toString(),
      rooms: formState.rooms.toString(),
      cancellation: formState.cancellation.toString()
    });

    router.push(`/${locale}/hotels?${params.toString()}`);
  };

  // Calculate total guests
  const totalGuests = formState.guests.adults + formState.guests.children;

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit} className="bg-white w-full rounded-b-3xl shadow-2xl px-8 pb-8 pt-4 max-[767px]:p-6 border border-gray-100">
        <h2 className="text-md font-semibold text-start text-gray-800 mb-4 w-full">
          {t("SearchTitle")}
        </h2>

        <div className="flex items-center gap-5 max-[767px]:gap-2 max-[767px]:flex-col">
          <div className="flex-1 flex gap-3 max-[767px]:w-full">
            <div className="flex-1 relative">
              <div className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
                <Calendar size={16} className="text-blue-500" />
                المكان
              </div>
              <div className="relative !text-gray-900">
                <HotelLocationSelect
                  value={formState.destination}
                  onChange={(value) => handleInputChange('destination', value)}
                  placeholder={t('Destination.Placeholder')}
                />
              </div>
            </div>
          </div>

          {/* Date Pickers */}
          <div className="flex-1 flex gap-3 max-[767px]:w-full">
            <div className="flex-1 relative">
              <div className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
                <Calendar size={16} className="text-blue-500" />
                {t("Date.CheckIn")}
              </div>
              <UiDatePicker
                selected={formState.checkIn}
                onChange={(date) => handleInputChange('checkIn', date)}
                minDate={new Date()}
                placeholderText={t("Date.CheckInPlaceholder")}
                className="w-full"
              />
            </div>

            <div className="flex-1 relative">
              <div className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
                <Calendar size={16} className="text-blue-500" />
                {t("Date.CheckOut")}
              </div>
              <UiDatePicker
                selected={formState.checkOut}
                onChange={(date) => handleInputChange('checkOut', date)}
                minDate={formState.checkIn || new Date()}
                placeholderText={t("Date.CheckOutPlaceholder")}
                className="w-full"
              />
            </div>
          </div>

          {/* Guests & Rooms */}
          <div className="flex-1 flex gap-3 max-[767px]:w-full">
            <div className="flex-1 relative">
              <div className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
                <Calendar size={16} className="text-blue-500" />
                {t("Date.CheckIn")}
              </div>
            

            
            <div
              className="border border-gray-200 rounded-xl px-4 py-3 pl-12 cursor-pointer hover:border-blue-400 transition-colors duration-300 bg-white shadow-sm"
              onClick={() => setUiState(prev => ({ ...prev, showGuestRoomSelect: !prev.showGuestRoomSelect }))}
            >
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <User size={20} className="text-blue-500" />
              </div>
              <div className="font-medium text-gray-800">
                {totalGuests} {totalGuests === 1 ? t("GuestsRooms.Guest") : t("GuestsRooms.Guests")},
                {' '}{formState.rooms} {formState.rooms === 1 ? t("GuestsRooms.Room") : t("GuestsRooms.Rooms")}
              </div>
            </div>

            {uiState.showGuestRoomSelect && (
              <GuestRoomSelector
                guests={formState.guests}
                rooms={formState.rooms}
                onChange={handleGuestRoomChange}
                onClose={() => setUiState(prev => ({ ...prev, showGuestRoomSelect: false }))}
              />
            )}
          </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-4 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-4">
          {/* Cancellation Policy */}
          <div className="flex items-center pl-3 max-[767px]:pl-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cancellation"
                checked={formState.cancellation}
                onChange={(e) => handleInputChange('cancellation', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-400 cursor-pointer"
              />
              <label htmlFor="cancellation" className="mx-2 block text-sm font-medium text-gray-700 cursor-pointer">
                {t("CancellationPolicy")}
              </label>
            </div>
          </div>

          {/* Search Button */}
          <div className="max-[767px]:w-full">
            <button
              type="submit"
              className="w-full cursor-pointer rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2">
                <Search size={20} className="" />
                <span className="font-medium">{t("SearchButton")}</span>
              </div>
            </button>
          </div>
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