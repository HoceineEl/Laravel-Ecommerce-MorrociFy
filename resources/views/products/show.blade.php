@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <h3 class="card-header">{{ $product->title }}</h3>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img class="img-fluid" src="{{ asset($product->image) }}" alt="{{ $product->title }}">
                            </div>
                            <div class="col-md-6">
                                <h5 class="card-title">{{ $product->title }}</h5>
                                <p class="card-text">{{ $product->description }}</p>
                                <p class="text-dark font-weight-bold">{{ $product->category->title }}</p>
                                <p class="d-flex justify-content-between align-items-center">
                                    <span class="text-muted">{{ $product->price }} $</span>
                                    <span class="text-danger">
                                        <strike>{{ $product->old_price }} $</strike>
                                    </span>
                                </p>
                                <p class="font-weight-bold">
                                    @if ($product->inStock > 0)
                                        <span class="text-success">In Stock</span>
                                    @else
                                        <span class="text-danger">N/A</span>
                                    @endif
                                </p>
                                <form action="{{ route('add.cart', $product->slug) }}" method="post">
                                    @csrf
                                    <div class="form-group">
                                        <label for="qty" class="label-input">Qty :</label>
                                        <input type="number" name="qty" id="qty" value="1"
                                            placeholder="Quantité" max="{{ $product->inStock }}" min="1"
                                            class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-primary">
                                            <i class="fa fa-shopping-cart"></i> Add to Cart
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <h5 class="card-header">Related Products</h5>
                    <div class="card-body">
                        <ul class="list-group">
                            @foreach ($product->category->products as $relatedProduct)
                                <li class="list-group-item">
                                    <a
                                        href="{{ route('products.show', $relatedProduct->slug) }}">{{ $relatedProduct->title }}</a>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
