<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $items = Cart::where('user_id', $user->id)->get();

        return view('cart.index', compact('items','user'));
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $cartItem = new Cart([
            'user_id' => $user->id,
            'product_id' => $request->product_id,
            'quantity' => $request->input('quantity', 1),
        ]);
        $cartItem->save();

        return redirect()->route('cart.index')->with('success', 'Product added to cart successfully.');
    }

    public function update(Request $request, Cart $cart)
    {
        $cart->quantity = $request->input('quantity', 1);
        $cart->save();

        return redirect()->route('cart.index')->with('success', 'Cart item updated successfully.');
    }

    public function destroy($id)
    {
        $cart = Cart::find($id);
        $cart->delete();

        return redirect()->route('cart.index')->with('success', 'Cart item removed successfully.');
    }
}
