@extends('layouts.app')

@section('content')
    <style>
        .modal-backdrop.blur {
            backdrop-filter: blur(8px);
        }
    </style>
    <div class="container">
        <div class="row">
            @foreach ($products as $product)
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <!-- START single card -->
                    <div class="ec-product-tp">
                        <div class="ec-product-image">
                            <a href="#">
                                <img class="img-center" src="{{ asset($product->image) }}" alt="" />
                            </a>
                            <span class="ec-product-ribbon">New</span>
                            <div class="ec-link-icon">
                                <a href="#" data-tip="Add to Wishlist"><i class="fi-rr-heart"></i></a>

                                <a href="{{ route('products.show', $product->slug) }}">
                                    <i class="fi-rr-eye"></i></a>

                            </div>
                        </div>
                        <div class="ec-product-body">
                            <h3 class="ec-title"><a
                                    href="{{ route('products.show', $product->slug) }}">{{ $product->title }}</a>
                            </h3>
                            <p class="ec-description">
                                {{ Str::limit($product->description, 30) }}
                            </p>

                            <div class="ec-price">
                                <span>{{ $product->old_price }}DH</span>  {{ $product->price }}DH
                            </div>

                            <div class="ec-link-btn">
                                <button class="ec-add-to-cart" type="button" data-toggle="modal"
                                    data-target="#addToCartModal{{ $product->id }}">add to cart</button>
                            </div>

                        </div>

                    </div>
                    <!-- START single card -->
                </div>
                <div class="modal fade" id="addToCartModal{{ $product->id }}" tabindex="-1" role="dialog"
                    aria-labelledby="addToCartModal{{ $product->id }}Label" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addToCartModal{{ $product->id }}Label">Enter Quantity</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form action="{{ route('add.cart', $product) }}" method="POST">
                                    @csrf
                                    <div class="form-group">
                                        <label for="quantity">Quantity:</label>
                                        <input type="number" class="form-control" id="quantity" name="quantity" required>
                                        <input type="hidden" value="{{ $product->id }}" name="product_id" required>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Add to Cart</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
        <hr>
        <div class="justify-content-center d-flex">
            {{ $products->links('vendor.pagination.bootstrap-5') }}
        </div>

        <div class="col-md-4">
            <div class="list-group">
                <li class="list-group-item active">
                    Categories
                </li>
                @foreach ($categories as $category)
                    <a href="{{ route('category.products', $category->slug) }}"
                        class="list-group-item list-group-item-action">
                        {{ $category->title }}
                        ({{ $category->products->count() }})
                    </a>
                @endforeach
            </div>
        </div>

    </div>
@endsection
