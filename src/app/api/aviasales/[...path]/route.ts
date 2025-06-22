import { NextRequest, NextResponse } from 'next/server';

// Required configuration for dynamic routes
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET(req: NextRequest) {
  try {
    // Get the full path from the request URL
    const url = new URL(req.url);
    const pathname = url.pathname;
    
    // Extract the API path after '/api/aviasales/'
    const basePath = '/api/aviasales/';
    const apiPath = pathname.startsWith(basePath) 
      ? pathname.slice(basePath.length)
      : '';
    
    const baseUrl = process.env.NEXT_PUBLIC_AVIASALES_BASE_URL;
    const apiToken = process.env.TRAVELPAYOUTS_API_TOKEN;
    
    if (!baseUrl || !apiToken) {
      return NextResponse.json(
        { error: "Server configuration error - check environment variables" },
        { status: 500 }
      );
    }

    // Handle hotel search specifically
    if (apiPath === 'hotels_search') {
      return handleHotelSearch(req, baseUrl, apiToken);
    }

    // Construct target URL for flight searches
    const targetUrl = new URL(`${baseUrl}/${apiPath}`);
    
    // Transfer query parameters
    url.searchParams.forEach((value, key) => {
      targetUrl.searchParams.append(key, value);
    });
    
    // Add authentication
    targetUrl.searchParams.append('token', apiToken);

    console.log(`Proxying flight search to: ${targetUrl.toString()}`);
    
    const apiResponse = await fetch(targetUrl.toString(), {
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 0 }
    });
    
    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      throw new Error(`Aviasales API error: ${apiResponse.status} - ${errorText}`);
    }
    
    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('API proxy error:', errorMessage);
    return NextResponse.json(
      { error: errorMessage || 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// Special handler for hotel searches
async function handleHotelSearch(req: NextRequest, baseUrl: string, apiToken: string) {
  const { searchParams } = new URL(req.url);
  
  // Validate required parameters
  const location = searchParams.get('location');
  const check_in = searchParams.get('check_in');
  const check_out = searchParams.get('check_out');
  
  if (!location || !check_in || !check_out) {
    return NextResponse.json(
      { error: "Missing required parameters: location, check_in, check_out" },
      { status: 400 }
    );
  }

  // Build parameters object with defaults
  const params: Record<string, string> = {
    location,
    check_in,
    check_out,
    currency: searchParams.get('currency') || 'usd',
    adults: searchParams.get('adults') || '2',
    children: searchParams.get('children') || '0',
    rooms: searchParams.get('rooms') || '1',
    sort_by: searchParams.get('sort_by') || 'price',
    limit: searchParams.get('limit') || '10',
    min_price: searchParams.get('min_price') || '0',
    max_price: searchParams.get('max_price') || '1000',
    min_rating: searchParams.get('min_rating') || '0',
    token: apiToken
  };

  // Build URL for hotel search
  const hotelUrl = new URL(`${baseUrl}/aviasales/v2/hotels_search`);
  Object.entries(params).forEach(([key, value]) => {
    hotelUrl.searchParams.append(key, value);
  });

  console.log(`Proxying hotel search to: ${hotelUrl.toString()}`);
  
  try {
    const response = await fetch(hotelUrl.toString(), {
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hotel API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Handle TravelPayouts API errors
    if (data.error) {
      return NextResponse.json(
        { error: data.error, details: data },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    let status = 500;
    let message = 'Failed to fetch hotels';
    
    if (error instanceof Error) {
      console.error('Hotel search API error:', error.message);
      
      // Handle specific error cases
      if (error.message.includes('location')) {
        message = 'Invalid location. Please try a different city.';
        status = 400;
      } else if (error.message.includes('date') || error.message.includes('check')) {
        message = 'Invalid date range. Check-out must be after check-in.';
        status = 400;
      } else if (error.message.includes('token')) {
        message = 'Authentication error. Please contact support.';
        status = 401;
      }
    }
    
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}