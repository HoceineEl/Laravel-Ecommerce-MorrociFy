@extends('layouts.app')
@section('content')
    <section class="ec-page-content section-space-p">
        <div class="container">
            <div class="row">
                <div class="ec-cart-leftside col-12">
                    <!-- cart content Start -->
                    <div class="ec-cart-content">
                        <div class="ec-cart-inner">

                            <div class="table-content cart-table-content">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th style="text-align: center;">Quantity</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($items as $item)
                                            <tr>

                                                <td data-label="Product" class="ec-cart-pro-name">
                                                    <a href="{{ route('products.show', $item->product->slug) }}">
                                                        <img class="ec-cart-pro-img mr-4"
                                                            src="{{ asset($item->product->image) }}"
                                                            alt="{{ $item->product->title }}" />
                                                        {{ $item->product->title }}
                                                    </a>
                                                </td>
                                                <td data-label="Price" class="ec-cart-pro-price">
                                                    <span class="amount">${{ $item->product->price }}</span>
                                                </td>
                                                <td data-label="Quantity" class="ec-cart-pro-qty"
                                                    style="text-align: center;">
                                                    <div class="cart-qty-plus-minus">
                                                        <input class="cart-plus-minus" type="text" name="cartqtybutton"
                                                            value="{{ $item->quantity }}" />
                                                    </div>
                                                </td>
                                                <td data-label="Total" class="ec-cart-pro-subtotal">
                                                    ${{ $item->product->price * $item->quantity }}</td>
                                                <td data-label="Remove" class="ec-cart-pro-remove">
                                                    <form action="{{ route('cart.destroy', $item->id) }}" method="post">
                                                        @csrf
                                                        @method('DELETE')

                                                        <button type="submit"><i
                                                                class="ecicon
                                                            eci-trash-o"></i></button>

                                                    </form>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <!-- cart content End -->
                </div>
            </div>
        </div>
    </section>
@endsection
