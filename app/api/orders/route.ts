import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";

interface OrderRequest {
  items: Array<{
    bookId: string;
    quantity: number;
    book: {
      id: string;
      title: string;
      author: string;
      price: number;
      coverImageUrl: string;
    };
  }>;
  totalPrice: number;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  paymentMethod: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderRequest = await request.json();

    // Validate required fields
    if (
      !body.items ||
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        { error: "Cart cannot be empty" },
        { status: 400 }
      );
    }

    if (!body.shippingName || !body.shippingAddress) {
      return NextResponse.json(
        { error: "Shipping details are required" },
        { status: 400 }
      );
    }

    if (!body.paymentMethod) {
      return NextResponse.json(
        { error: "Payment method is required" },
        { status: 400 }
      );
    }

    // Calculate tax (simple 10% tax)
    const taxAmount = Math.round(body.totalPrice * 0.1);
    const finalTotal = body.totalPrice + taxAmount;

    const orderId = uuidv4();

    const { error } = await supabase
      .from("online_bookstore_apeqx_orders")
      .insert([
        {
          id: orderId,
          items: body.items,
          total_price: body.totalPrice,
          tax_amount: taxAmount,
          shipping_name: body.shippingName,
          shipping_address: body.shippingAddress,
          shipping_city: body.shippingCity,
          shipping_state: body.shippingState,
          shipping_zip: body.shippingZip,
          payment_method: body.paymentMethod,
          status: "confirmed",
        },
      ]);

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        orderId,
        totalPrice: finalTotal,
        taxAmount,
        message: "Order created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}